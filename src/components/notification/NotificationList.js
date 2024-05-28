export const NotificationList = [
    { 
      content: {
            title: "You have a new message! 📬", 
            body: "See the new vacation updates", 
            data: { data: "goes here", test: {test1: "more data" }},
            sound: true, 
        }, 
        trigger: { seconds: 1, channelId: 'mail'},
    },
    {
        content: {
            title: "A user has joined your trip! 🙇",
            body: "See who joined your trip", 
            sound: true,
        }, 
        trigger: { seconds: 1, channelId: 'trips'},
    },
    {
        content: {
            title: "Your trip dates match with someone! 🙇",
            body: "find out who your trip or destination matched with", 
            sound: true
        }, 
        trigger: { seconds: 1, channelId: 'trips'},
    }
]