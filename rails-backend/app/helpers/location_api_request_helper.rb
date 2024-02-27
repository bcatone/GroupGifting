module LocationApiRequestHelper

    def get_location_data_from_coords(lat, lon)
        begin
            response = RestClient.get("https://geocode.maps.co/reverse?lat=#{lat}&lon=#{lon}")
        rescue RestClient::NotFound
            error_message = "Could not find location information for (#{lat},#{lon})"
            puts error_message
            return { error: error_message, status: 404}
        else
            location_data = JSON.parse(response)
            return location_data
        end
    end

    def get_location_data_from_zip(zip, country = "United States")
        begin
            response = RestClient.get("https://geocode.maps.co/search?q=#{zip}%20#{country}")
        rescue RestClient::NotFound
            error_message = "Could not find location information for zip code #{zip}"
            puts error_message
            return { error: error_message, status: 404 }
        else
            zip_data = JSON.parse(response)

            lat = zip_data[0].lat
            lon = zip_data[0].lon

            location_data = get_location_data_from_coords(lat, lon)

            location_data["city"] = get_city_name(location_data)

            return location_data
        end
    end

    # Geocode uses multiple keys depending on the area type
    def get_city_name(location_hash)
        city_types_arr = ["city", "suburb", "town", "hamlet"]
        city_types_arr.each do |type|
            if location_hash["address"]["#{type}"]
                return location_hash["address"]["#{type}"]
            else
                return ""
            end
        end
    end
end