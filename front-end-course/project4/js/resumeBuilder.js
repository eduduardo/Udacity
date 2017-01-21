var bio = {
    "name": 'Eduardo Ramos',
    "role": 'Web Developer',
    "contacts": {
        'mobile': '99999-9999',
        'email': 'eduardo.auramos@gmail.com',
        'github': 'eduduardo',
        'twitter': '@EduardoRamos__',
        'location': 'Brasil',
    },
    "biopic": "images/foto.jpg",
    "welcomeMessage": "Hi, welcome to my portifolio!",
    "skills": ['Web development', 'HTML5', 'CSS', 'PHP']
};

var education = {
    "schools": [{
        "name": "ETEC Pedro Ferreira Alves",
        "location": "Mogi Mirim - São Paulo",
        "degree": "Information Tecnhican",
        "majors": ['Computer Science'],
        "dates": "2016",
        "url": "",
    }],
    "onlineCourses": [{
        "title": "Front-end Developer",
        "school": "Udacity",
        "dates": "2016",
        "url": "https://br.udacity.com/course/front-end-web-developer-nanodegree--nd001/",
    }]
};

var work = {
    "jobs": [{
        "employer": "Central Tecnologia",
        "title": "Information Tecnhican",
        "location": "Campinas - São Paulo",
        "dates": "June 2015 - December 2016",
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed" +
            "do eiusmod tempor incididunt ut labore et dolore magna aliqua." +
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris " +
            " nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in " +
            " voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
    }]
};

var projects = {
    "projects": [{
        "title": "Project Cosmos",
        "dates": "2016",
        "description": "A school project for divulgation of astronomy for young people",
        "images": ["images/cosmos.jpg"],
    }]
};

bio.display = function() {
    var formattedName = HTMLheaderName.replace('%data%', bio.name);
    var formattedRole = HTMLheaderRole.replace('%data%', bio.role);
    var formattedBioPicture = HTMLbioPic.replace('%data%', bio.biopic);
    var formattedMessage = HTMLwelcomeMsg.replace('%data%', bio.welcomeMessage);

    var contactInfo = [];
    contactInfo.push(HTMLmobile.replace("%data%", bio.contacts.mobile));
    contactInfo.push(HTMLemail.replace("%data%", bio.contacts.email));
    contactInfo.push(HTMLgithub.replace("%data%", bio.contacts.github));
    contactInfo.push(HTMLtwitter.replace("%data%", bio.contacts.twitter));
    contactInfo.push(HTMLlocation.replace("%data%", bio.contacts.location));

    $("#header").prepend(formattedRole);
    $("#header").prepend(formattedName);
    $("#header").append(formattedBioPicture);
    $("#header").append(formattedMessage);
    $("#header").append(HTMLskillsStart);

    bio.skills.forEach(function(skill) {
        $("#skills").append(HTMLskills.replace("%data%", skill));
    });

    contactInfo.forEach(function(info) {
        $("#topContacts").append(info);
        $("#footerContacts").append(info);
    });
};

work.display = function() {
    work.jobs.forEach(function(job) {
        var formattedEmployer = HTMLworkEmployer.replace("%data%", job.employer);
        var formattedTitle = HTMLworkTitle.replace("%data%", job.title);
        var formattedDates = HTMLworkDates.replace("%data%", job.dates);
        var formattedLocation = HTMLworkLocation.replace("%data%", job.location);
        var formattedDescription = HTMLworkDescription.replace("%data%", job.description);

        $("#workExperience").append(HTMLworkStart);
        $('.work-entry:last').append(formattedEmployer + formattedTitle);
        $('.work-entry:last').append(formattedDates);
        $('.work-entry:last').append(formattedLocation);
        $('.work-entry:last').append(formattedDescription);
    });
};

projects.display = function() {
    projects.projects.forEach(function(project) {
        var formattedTitle = HTMLprojectTitle.replace("%data%", project.title);
        var formattedDates = HTMLprojectDates.replace("%data%", project.dates);
        var formattedDesciption = HTMLprojectDescription.replace("%data%", project.description);

        $("#projects").append(HTMLprojectStart);
        $(".project-entry:last").append(formattedTitle);
        $(".project-entry:last").append(formattedDates);
        $(".project-entry:last").append(formattedDesciption);

        project.images.forEach(function(image) {
            var formattedImage = HTMLprojectImage.replace("%data%", image);
            $(".project-entry:last").append(formattedImage);
        })

    });
};

education.display = function() {
    education.schools.forEach(function(school) {
        var formattedName = HTMLschoolName.replace("%data%", school.name);
        var formattedDegree = HTMLschoolDegree.replace("%data%", school.degree);
        var formattedDates = HTMLschoolDates.replace("%data%", school.dates);
        var formattedLocation = HTMLschoolLocation.replace("%data%", school.location);

        $("#education").append(HTMLschoolStart);
        $('.education-entry:last').append(formattedName + formattedDegree);
        $('.education-entry:last').append(formattedDates);
        $('.education-entry:last').append(formattedLocation);

        school.majors.forEach(function(major) {
            var formattedMajor = HTMLschoolMajor.replace("%data%", major);

            $('.education-entry:last').append(formattedMajor);
        });

        $('.education-entry:last').children('a').attr("href", school.url);
    });


    education.onlineCourses.forEach(function(course) {
        var formattedTitle = HTMLonlineTitle.replace("%data%", course.title);
        var formattedSchool = HTMLonlineSchool.replace("%data%", course.school);
        var formattedDates = HTMLonlineDates.replace("%data%", course.dates);

        $("#education").append(HTMLonlineClasses);
        $("#education").append(HTMLschoolStart);
        $('.education-entry:last').append(formattedTitle + formattedSchool);
        $('.education-entry:last').append(formattedDates);
        $('.education-entry:last').children('a').attr("href", course.url);
    });
};

bio.display();
education.display();
work.display();
projects.display();
$("#mapDiv").append(googleMap);
