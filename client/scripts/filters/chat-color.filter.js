angular.module("app")

.filter("chatColor", function () {
    return function (chat) {
        if (!chat) return;

        let otherId = _.without(chat.userIds, Meteor.userId())[0];

        let otherUser = Meteor.users.findOne(otherId);
        let hasColor = otherUser && otherUser.profile && otherUser.profile.color;
        return hasColor ? otherUser.profile.color : 'rgb(244, 67, 54)';
    };
})