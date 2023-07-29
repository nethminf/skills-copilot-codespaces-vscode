function skillsMember() {
    return {
        restrict: 'E',
        templateUrl: 'app/components/members/skills-member.html',
        controller: 'SkillsMemberController',
        controllerAs: 'vm',
        bindToController: true,
        scope: {
            member: '=',
            skills: '='
        }
    };
}