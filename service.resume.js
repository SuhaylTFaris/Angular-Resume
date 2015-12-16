(function() {
	"use strict";

	var _ = window._;
	var myResume = {
		//Enter your name here
		name : 'Suhayl Faris',

		//Enter your address here
		address : {
			street1: '3651 S. Mobile Way',
			street2: '',
			city: 'Aurora',
			state: 'CO',
			zip: '80013'
		},

		phoneNumber: '720-999-3948',

		email: 'suhayltfaris@gmail.com',

		github: 'https://github.com/SuhaylTFaris',

		blog: null,

		//Enter your objective here
		objective : "<p>To use what I have learned in my time in the Galvanize (GSchool) program by designing apps and websites to help people further their businesses and life." +
					"to help companies solve difficult and interesting problems and stay on the cutting edge of technology innovation.</p>" +
					'<strong class="text-muted">MEAN Stack Developer</strong>',

		//Enter your comma separated skills here.  Any skills you enter will appear at the
		//front of the skills list.  Other skills from your tags and skillsUsed in projects
		//will be added at the end
		skills : [
			"JavaScript",
			"HTML5/CSS",
			"MongoDB",
			"Asynchronous Development",
			"Ruby"
		],

		projectsHeader : '<h4>Projects done during GSchool</h4>' +
						 '<h5>Project History</h5>',

		projectsFooter : '<strong class="text-muted">MEAN stack and vanilla JS/Jquery projects</strong>',

		//List your projects below
		projects : [
			{
				company : 'GSchool',
				projectName : 'Linguist - Language Alphabet Helper',
				dates: '8/22/15 - Present',
				skillsUsed : [
					'JavaScript',
					'AngularJS',
					'MongoDB',
					'NodeJS'
				],
				tags : [
					''
				],
				highlights : [
					'Helps people learn the basics of currently 3 languages (Japanese, Portuguese and German.'
				]
			}
		],

		//List your education here
		education : [
			{
				degree : 'Full Stack Web Developer',
				school : "Galvanize University",
				gradDate : '2015',
				comments : ''
			}
		]
	};

	window.angular.module("resume").factory('ResumeService', ['$q', function ($q) {
		function getResume() {
			var defer = $q.defer();
			//if later you want to use REST inject $http and change this
			setTimeout(function () {
				var skills = {};
				//build the skills list from the tags and skills listed in the projects

				//rapidly de-dup skills
				_.each(myResume.projects, function (project) {
					_.each(project.skillsUsed, function (aSkill) {
						skills[aSkill] = (skills[aSkill] || 0) + 1;
					});
					if (project.tags) {
						_.each(project.tags, function (aTag) {
							skills[aTag] = true;
						});
					}
				});

				//now remove ones that we want at the top of the skills list
				_.each(myResume.skills, function (aPredefinedSkill) {
					skills[aPredefinedSkill] = false;
				});

				//attach the leftovers to the skills list and build activeSkills list
				myResume.activeSkills = {};
				_.each(Object.keys(skills), function (aSkill) {
					if (skills.hasOwnProperty(aSkill)) {
						if (skills[aSkill]) {
							myResume.skills.push(aSkill);
						}
						myResume.activeSkills[aSkill] = true;
					}
				});

				defer.resolve(myResume);
			}, 0);
			return defer.promise;
		}

		function toggleSkillActive(skill) {
			if (skill) {
				myResume.activeSkills[skill] = !myResume.activeSkills[skill];
			}
		}

		function containsActiveSkills (skillSet) {
			return _.reduce(skillSet, function(memo, skill) {
				return memo || myResume.activeSkills[skill];
			}, false);
		}

		function skillIsActive (skill) {
			return myResume.activeSkills[skill] === true;
		}

		return {
			getResume : getResume,
			toggleSkillActive: toggleSkillActive,
			skillIsActive: skillIsActive,
			containsActiveSkills: containsActiveSkills
		};
	}]);
}).call();
