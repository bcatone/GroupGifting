import { createConsumer } from "actioncable-js";

const cable = createConsumer("ws://localhost:3000/cable");

export const subscribeToChatChannel = (callback) => {
  const subscription = cable.subscriptions.create("ChatChannel", {
    received(data) {
      callback(data);
    },
  });

  return subscription;
};

export const subscribeToNotificationChannel = (callback) => {
  const subscription = cable.subscriptions.create("NotificationChannel", {
    received(data) {
      callback(data);
    },
  });

  return subscription;
};

export default cable;
