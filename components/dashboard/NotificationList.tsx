import React from 'react';

type NotificationData = {
  id: number;
  message: string;
  time: string;
};

interface NotificationListProps {
  notifications: NotificationData[];
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications }) => {
  return (
    <div className="mt-8 bg-white shadow-sm rounded-md p-6">
      <h2 className="text-xl font-semibold mb-4">Notificaciones</h2>
      <div className="space-y-4">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="flex items-center space-x-4 border-b pb-4 hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex-1 text-sm text-gray-700">{notif.message}</div>
            <div className="text-xs text-gray-500">{notif.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationList;
