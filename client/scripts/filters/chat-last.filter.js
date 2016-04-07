angular.module("app")

.filter("chatLast", function () {
    return function (chat) {
        if (!chat) return;

        let otherId = _.without(chat.userIds, Meteor.userId())[0];
        let otherUser = Meteor.users.findOne(otherId);
        let hasName = otherUser && otherUser.profile && otherUser.profile.lastName;
        return hasName ? otherUser.profile.lastName.charAt(0) : 'NO NAME';
    };
})