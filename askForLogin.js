// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var Cloud = require('ti.cloud');

// Alloy.Globals.Cloud.login($.email.value, $.password.value, $.askForLogin, 'home');

var email = '';
var password = '';
var ID = '';
// var window_to_open = '';
// var window_to_colse = '';
var specified = false;

function login() {
	email = $.email.value;
	password = $.password.value;
	// window_to_close = $.askForLogin;
	// window_to_open = 'teacherHome';

	Cloud.Users.login({
		login : email,
		password : password
	}, function(e) {
		if (e.success) {
			var user = e.users[0];

			GetID();

			Ti.App.Properties.setObject('user', user);
			Ti.App.Properties.setString('email', email);
			Ti.App.Properties.setString('password', password);
			Ti.App.fireEvent('user_logged_in');
			// if (window_to_open != null) {
				// Alloy.createController(window_to_open).getView().open();
			// }
			// if (window_to_close != null) {
				// window_to_close.close();
			// }
		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
};

function GetID() {

	Cloud.Users.showMe(function(e) {
		if (e.success) {
			var user = e.users[0];
			// alert('id: ' + user.id);
			ID = user.id;
			GetRule();
			findStudent();
		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});

}

function GetRule() {

	Cloud.Objects.query({
		classname : 'teachers',
		page : 1,
		per_page : 10,
		where : {
			owner_id : ID
		}
	}, function(e) {
		if (e.success) {
			// alert('Success:\n' + 'Count: ' + e.students.length);
			for (var i = 0; i < e.teachers.length; i++) {
				var teacher = e.teachers[i];
				// alert(student.name);
				if (teacher.rule != null) {
					Ti.App.Properties.setString('teacherObjId', teacher.owner_id);
					Alloy.createController('teacherHome').getView().open();
					Ti.App.Properties.setString('page', 'teacherHome');
					$.askForLogin.close();
					
				}
			}
		} else {
			alert('it was not student');
		}
	});

}

function findStudent() {
	Cloud.Objects.query({
		classname : 'students',
		page : 1,
		per_page : 10,
		where : {
			owner_id : ID
		}
	}, function(e) {
		if (e.success) {
			// alert('Success:\n' + 'Count: ' + e.students.length);
			for (var i = 0; i < e.students.length; i++) {
				var student = e.students[i];
				// alert(student.name);
				if (student.rule != null) {
					Ti.App.Properties.setString('studentObjId', student.owner_id);
					Alloy.createController('studentHome').getView().open();
					Ti.App.Properties.setString('page', 'studentHome');
					$.askForLogin.close();
				}
			}
		} else {
			alert('it was not student');
		}
	});
}

function signUpLblClick() {
	Alloy.createController('studentOrTeacher').getView().open();
}
