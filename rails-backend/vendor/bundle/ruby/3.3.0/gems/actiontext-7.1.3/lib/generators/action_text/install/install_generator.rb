# frozen_string_literal: true

require "pathname"
require "json"

module ActionText
  module Generators
    class InstallGenerator < ::Rails::Generators::Base
      source_root File.expand_path("templates", __dir__)

      def install_javascript_dependencies
        say "Installing JavaScript dependencies", :green
        if using_bun?
          run "bun add @rails/actiontext trix"
        elsif using_node?
          run "yarn add @rails/actiontext trix"
        end
      end

      def append_javascript_dependencies
        destination = Pathname(destination_root)

        if (application_javascript_path = destination.join("app/javascript/application.js")).exist?
          insert_into_file application_javascript_path.to_s, %(\nimport "trix"\nimport "@rails/actiontext"\n)
        else
          say <<~INSTRUCTIONS, :green
            You must import the @rails/actiontext and trix JavaScript modules in your application entrypoint.
          INSTRUCTIONS
        end

        if (importmap_path = destination.join("config/importmap.rb")).exist?
          append_to_file importmap_path.to_s, %(pin "trix"\npin "@rails/actiontext", to: "actiontext.esm.js"\n)
        end
      end

      def create_actiontext_files
        destination = Pathname(destination_root)

        template "actiontext.css", "app/assets/stylesheets/actiontext.css"

        unless destination.join("app/assets/application.css").exist?
          if (stylesheets = Dir.glob "#{destination_root}/app/assets/stylesheets/application.*.{scss,css}").length > 0
            insert_into_file stylesheets.first.to_s, %(@import 'actiontext.css';)
          else
            say <<~INSTRUCTIONS, :green
              To use the Trix editor, you must require 'app/assets/stylesheets/actiontext.css' in your base stylesheet.
            INSTRUCTIONS
          end
        end

        gem_root = "#{__dir__}/../../../.."

        copy_file "#{gem_root}/app/views/active_storage/blobs/_blob.html.erb",
          "app/views/active_storage/blobs/_blob.html.erb"

        copy_file "#{gem_root}/app/views/layouts/action_text/contents/_content.html.erb",
          "app/views/layouts/action_text/contents/_content.html.erb"
      end

      def enable_image_processing_gem
        if (gemfile_path = Pathname(destination_root).join("Gemfile")).exist?
          say "Ensure image_processing gem has been enabled so image uploads will work (remember to bundle!)"
          uncomment_lines gemfile_path, /gem "image_processing"/
        end
      end

      def create_migrations
        rails_command "railties:install:migrations FROM=active_storage,action_text", inline: true
      end

      def using_js_runtime?
        @using_js_runtime ||= Pathname(destination_root).join("package.json").exist?
      end

      def using_bun?
        # Cannot assume yarn.lock has been generated yet so we look for
        # a file known to be generated by the jsbundling-rails gem
        @using_bun ||= using_js_runtime? && Pathname(destination_root).join("bun.config.js").exist?
      end

      def using_node?
        # Bun is the only runtime that _isn't_ node.
        @using_node ||= using_js_runtime? && !Pathname(destination_root).join("bun.config.js").exist?
      end

      hook_for :test_framework
    end
  end
end
