angular.module("app")

.filter("chatName", function () {
    return function (chat) {
        if (!chat) return;

        let otherId = _.without(chat.userIds, Meteor.userId())[0];
        let otherUser = Meteor.users.findOne(otherId);
        let hasName = otherUser && otherUser.profile && otherUser.profile.firstName;
        return hasName ? otherUser.profile.firstName : 'NO NAME';
    };
})