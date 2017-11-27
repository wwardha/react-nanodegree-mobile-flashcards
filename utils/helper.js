import React from 'react';
import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'MobileFlashCards:notifications';

export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync);
}
  
function createNotification () {
    return {
        title: 'Complete a Quiz',
        body: "Don't forget to complete at least one quiz for today!",
        ios: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}
  
export function setLocalNotification (delta) {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
        if (data === null) {
            Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
                if (status === 'granted') {
                    Notifications.cancelAllScheduledNotificationsAsync();
  
                    let notificationDay = new Date();
                    notificationDay.setDate(notificationDay.getDate() + delta);
                    notificationDay.setHours(20);
                    notificationDay.setMinutes(0);
  
                    Notifications.scheduleLocalNotificationAsync(
                        createNotification(),
                        {
                            time: notificationDay,
                            repeat: 'day',
                        }
                    );
                    AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                } 
            })
        }
    })
}