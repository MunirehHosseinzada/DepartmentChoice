// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var Cloud = require('ti.cloud');
var active = 1;
var Sname,
    Slast_name,
    Sdepartment = '';
var Sstudent_id = 0;
var mainId = '';

Ti.App.addEventListener('user_logged_in', function(e) {
	alert('user is logged in ... from user_logged_in function home page. ');
});

//----------------------------------------------After This 31,Oct,2019---------------------------------------------------------

function allTActiveate() {
	if (active == 0) {
		$.allTeachers.setBackgroundColor('#27b8b0');
		$.someTeachers.setBackgroundColor('white');
		active = 1;
	}
}

function someTActivate() {
	if (active == 1) {
		$.someTeachers.setBackgroundColor('#27b8b0');
		$.allTeachers.setBackgroundColor('white');
		active = 0;
	}
}

someTActivate();

function getStudentInfo() {

	Cloud.Objects.query({
		classname : 'students',
		page : 1,
		per_page : 10,
		where : {
			owner_id : Ti.App.Properties.getString('studentObjId', '')
		}
	}, function(e) {
		if (e.success) {
			for (var i = 0; i < e.students.length; i++) {
				var student = e.students[i];
				Sname = student.name;
				Slast_name = student.last_name;
				Sdepartment = student.department;
				Sstudent_id = student.student_id;
				mainId = student.id;
				go();
			}
		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
	
	// loadAll();

}

function go() {
	var myName = Ti.UI.createLabel({
		text : "نام: " + Sname,
		color : 'black'
	});

	var myLname = Ti.UI.createLabel({
		text : "نام خانوادگی: " + Slast_name,
		color : 'black'
	});

	var myId = Ti.UI.createLabel({
		text : "آی دی: " + Sstudent_id,
		color : 'black'
	});

	var myDepartment = Ti.UI.createLabel({
		text : "دیپارتمنت: " + Sdepartment,
		color : 'black'
	});

	$.nameCont.add(myName);
	$.last_nameCont.add(myLname);
	$.idCont.add(myId);
	$.departmentC.add(myDepartment);

}

//***********************************************************************************

// var teacherIds = [];
// var teacherNames = [];
// var teacherLNames = [];
var teacherFullNames = [];

function loadTeachers() {

	teacherFullNames = [];
	// teacherIds = [];

	if (active == 1) {

		Cloud.Objects.query({
			classname : 'teachers',
			page : 1,
			per_page : 10
		}, function(e) {
			if (e.success) {
				// alert('Success:\n' + 'Count: ' + e.cars.length);
				for (var i = 0; i < e.teachers.length; i++) {
					var teacher = e.teachers[i];
					// teacherIds.push(teacher.id);
					// teacherNames.push(teacher.name);
					// teacherLNames.push(teacher.last_name);
					teacherFullNames.push(teacher.full_name);

				}

				myOptionDialog.options = teacherFullNames;
				myOptionDialog.show();

			} else {
				alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
		});
	} else {
		Cloud.Objects.query({
			classname : 'teachers',
			page : 1,
			per_page : 10,
			where : {
				department : Sdepartment
			}
		}, function(e) {
			if (e.success) {
				// alert('Success:\n' + 'Count: ' + e.cars.length);
				for (var i = 0; i < e.teachers.length; i++) {
					var teacher = e.teachers[i];
					// teacherIds.push(teacher.id);
					// teacherNames.push(teacher.name);
					// teacherLNames.push(teacher.last_name);
					teacherFullNames.push(teacher.full_name);

				}

				myOptionDialog.options = teacherFullNames;
				myOptionDialog.show();

			} else {
				alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
		});
	}

}

//**************************************************************************************

var myOptionDialog = Ti.UI.createOptionDialog({
	// options : teachers,
	title : 'انتخاب اول',

});

var choosenTeacherName = '';
var choosenTeacherID = '';

myOptionDialog.addEventListener('click', function(e) {
	// alert('clicked the ' + teacherFullNames[e.index]);
	choosenTeacherName = teacherFullNames[e.index];

	Cloud.Objects.query({
		classname : 'teachers',
		page : 1,
		per_page : 10,
		where : {
			full_name : choosenTeacherName
		}
	}, function(e) {
		if (e.success) {
			// alert('Success:\n' + 'Count: ' + e.cars.length);
			for (var i = 0; i < e.teachers.length; i++) {
				var teacher = e.teachers[i];
				choosenTeacherID = teacher.id;
			}
			// alert(choosenTeacherID);
		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
	Ti.App.Properties.setString('Aval', choosenTeacherName);
	$.firstLabel.setText(choosenTeacherName);

});
//____________________________________________________________________________________________

var SecondteacherFullNames = [];

function loadSecondTeachers() {

	SecondteacherFullNames = [];
	// teacherIds = [];

	if (active == 1) {

		Cloud.Objects.query({
			classname : 'teachers',
			page : 1,
			per_page : 10
		}, function(e) {
			if (e.success) {
				// alert('Success:\n' + 'Count: ' + e.cars.length);
				for (var i = 0; i < e.teachers.length; i++) {
					var teacher = e.teachers[i];
					// teacherIds.push(teacher.id);
					// teacherNames.push(teacher.name);
					// teacherLNames.push(teacher.last_name);
					SecondteacherFullNames.push(teacher.full_name);

				}

				secondOptionDialog.options = SecondteacherFullNames;
				secondOptionDialog.show();

			} else {
				alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
		});
	} else {

		Cloud.Objects.query({
			classname : 'teachers',
			page : 1,
			per_page : 10,
			where : {
				department : Sdepartment
			}
		}, function(e) {
			if (e.success) {
				// alert('Success:\n' + 'Count: ' + e.cars.length);
				for (var i = 0; i < e.teachers.length; i++) {
					var teacher = e.teachers[i];
					// teacherIds.push(teacher.id);
					// teacherNames.push(teacher.name);
					// teacherLNames.push(teacher.last_name);
					SecondteacherFullNames.push(teacher.full_name);

				}

				secondOptionDialog.options = SecondteacherFullNames;
				secondOptionDialog.show();

			} else {
				alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
		});
	}

}

//**************************************************************************************

var secondOptionDialog = Ti.UI.createOptionDialog({
	// options : teachers,
	title : 'انتخاب دوم',

});

var secondchoosenTeacherName = '';
var secondchoosenTeacherID = '';

secondOptionDialog.addEventListener('click', function(e) {
	// alert('clicked the ' + teacherFullNames[e.index]);
	secondchoosenTeacherName = SecondteacherFullNames[e.index];

	Cloud.Objects.query({
		classname : 'teachers',
		page : 1,
		per_page : 10,
		where : {
			full_name : secondchoosenTeacherName
		}
	}, function(e) {
		if (e.success) {
			// alert('Success:\n' + 'Count: ' + e.cars.length);
			for (var i = 0; i < e.teachers.length; i++) {
				var teacher = e.teachers[i];
				secondchoosenTeacherID = teacher.id;
			}
			// alert(secondchoosenTeacherID);
		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});

	Ti.App.Properties.setString('dovom', secondchoosenTeacherName);
	$.secondLable.setText(secondchoosenTeacherName);

});

//____________________________________third choice_____________________________________________________________

var thirdteacherFullNames = [];

function loadThirdTeachers() {

	thirdteacherFullNames = [];
	// teacherIds = [];

	if (active == 1) {

		Cloud.Objects.query({
			classname : 'teachers',
			page : 1,
			per_page : 10
		}, function(e) {
			if (e.success) {
				// alert('Success:\n' + 'Count: ' + e.cars.length);
				for (var i = 0; i < e.teachers.length; i++) {
					var teacher = e.teachers[i];
					// teacherIds.push(teacher.id);
					// teacherNames.push(teacher.name);
					// teacherLNames.push(teacher.last_name);
					thirdteacherFullNames.push(teacher.full_name);

				}

				thirdOptionDialog.options = thirdteacherFullNames;
				thirdOptionDialog.show();

			} else {
				alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
		});
	} else {

		Cloud.Objects.query({
			classname : 'teachers',
			page : 1,
			per_page : 10,
			where : {
				department : Sdepartment
			}
		}, function(e) {
			if (e.success) {
				// alert('Success:\n' + 'Count: ' + e.cars.length);
				for (var i = 0; i < e.teachers.length; i++) {
					var teacher = e.teachers[i];
					// teacherIds.push(teacher.id);
					// teacherNames.push(teacher.name);
					// teacherLNames.push(teacher.last_name);
					thirdteacherFullNames.push(teacher.full_name);

				}

				thirdOptionDialog.options = thirdteacherFullNames;
				thirdOptionDialog.show();

			} else {
				alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
		});
	}

}

//**************************************************************************************

var thirdOptionDialog = Ti.UI.createOptionDialog({
	// options : teachers,
	title : 'انتخاب سوم',

});

var thirdchoosenTeacherName = '';
var thirdchoosenTeacherID = '';

thirdOptionDialog.addEventListener('click', function(e) {
	// alert('clicked the ' + teacherFullNames[e.index]);
	thirdchoosenTeacherName = thirdteacherFullNames[e.index];

	Cloud.Objects.query({
		classname : 'teachers',
		page : 1,
		per_page : 10,
		where : {
			full_name : thirdchoosenTeacherName
		}
	}, function(e) {
		if (e.success) {
			// alert('Success:\n' + 'Count: ' + e.cars.length);
			for (var i = 0; i < e.teachers.length; i++) {
				var teacher = e.teachers[i];
				thirdchoosenTeacherID = teacher.id;
			}
			// alert(thirdchoosenTeacherID);
		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});

	Ti.App.Properties.setString('sevom', thirdchoosenTeacherName);
	$.thirdLabel.setText(thirdchoosenTeacherName);

});

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%Submmitting%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function submit() {

	Cloud.Objects.create({
		classname : "choices",
		su_id : Ti.App.Properties.getString('studentObjId', ''),
		fields : {
			sid : mainId,
			tid : choosenTeacherID,
			level : 1
		}
	}, function(e) {
		if (e.success) {
			var choice = e.choices[0];
		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});

	Cloud.Objects.create({
		classname : "choices",
		su_id : Ti.App.Properties.getString('studentObjId', ''),
		fields : {
			sid : mainId,
			tid : secondchoosenTeacherID,
			level : 2
		}
	}, function(e) {
		if (e.success) {
			var choice = e.choices[0];
		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});

	Cloud.Objects.create({
		classname : "choices",
		su_id : Ti.App.Properties.getString('studentObjId', ''),
		fields : {
			sid : mainId,
			tid : thirdchoosenTeacherID,
			level : 3
		}
	}, function(e) {
		if (e.success) {
			var choice = e.choices[0];
		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});

	alert('done');

}

function logoutMe() {
	Cloud.Users.logout(function(e) {
		if (e.success) {
			alert('Success: Logged out');
			Alloy.createController('askForLogin').getView().open();
			$.studentHome.close();
			Ti.App.Properties.setString('user', null);
		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
}

function loadAll(){
	
	if(Ti.App.Properties.getString('aval', '') != null){
		$.firstLabel.setText(Ti.App.Properties.getString('aval', ''));
		$.secondLable.setText(Ti.App.Properties.getString('dovom', ''));
		$.thirdLabel.setText(Ti.App.Properties.getString('sevom', ''));
	}
	
}
