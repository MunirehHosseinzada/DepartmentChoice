// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var Cloud = require('ti.cloud');
var Tname = '';
var Tlast_name = '';
var Tdepartment = '';
var mainId = '';

Ti.App.addEventListener('user_logged_in', function(e) {
	alert('user is logged in ... from user_logged_in function home page. ');
});

function getTeacherInfo() {

	Cloud.Objects.query({
		classname : 'teachers',
		page : 1,
		per_page : 10,
		where : {
			owner_id : Ti.App.Properties.getString('teacherObjId', '')
		}
	}, function(e) {
		if (e.success) {
			for (var i = 0; i < e.teachers.length; i++) {
				var teacher = e.teachers[i];
				Tname = teacher.name;
				Tlast_name = teacher.last_name;
				Tdepartment = teacher.department;
				mainId = teacher.id;
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
		text : "نام: " + Tname,
		color : 'black'
	});

	var myLname = Ti.UI.createLabel({
		text : "نام خانوادگی: " + Tlast_name,
		color : 'black'
	});

	var myDepartment = Ti.UI.createLabel({
		text : "دیپارتمنت: " + Tdepartment,
		color : 'black'
	});

	$.nameCont.add(myName);
	$.last_nameCont.add(myLname);
	$.departmentC.add(myDepartment);

	findRequests();
}

var studentsIds = [];

function findRequests() {

	studentsIds = [];

	Cloud.Objects.query({
		classname : 'choices',
		page : 1,
		per_page : 10,
		where : {
			tid : mainId
		}
	}, function(e) {
		if (e.success) {
			// alert('Success:\n' + 'Count: ' + e.choices.length);
			for (var i = 0; i < e.choices.length; i++) {
				var choice = e.choices[i];
				studentsIds.push(e.choices[i].sid);
				// alert('insde the for');
			}
			// alert('before student Infor');
			studentInfo();
			// alert('after student Infor');
		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
}

var studentNames = [];

function studentInfo() {

	for (j in studentsIds) {

		Cloud.Objects.query({
			classname : 'students',
			page : 1,
			per_page : 10,
			where : {
				id : studentsIds[j]
			}
		}, function(e) {
			if (e.success) {
				// alert('Success:\n' + 'Count: ' + e.students.length);
				for (var i = 0; i < e.students.length; i++) {
					var student = e.students[i];
					studentNames.push(e.students[i].full_name);
				}
				
				for(k in studentNames){
					
					var mystudentlbl = Ti.UI.createLabel({
						text: studentNames[k],
						color: '#7d7f80',
						top: '5dp',
						right: '10dp'
					});
					
					var myView = Ti.UI.createView({
						height: '1px',
						width: '90%',
						backgroundColor: '#3dabbf',
						top: '5dp'
					});
					
					$.myScroll.add(mystudentlbl);
					$.myScroll.add(myView);
					
				}
				
			} else {
				alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
		});

	}

}


function logoutMenow() {
	
	// alert('exit');
	Cloud.Users.logout(function(e) {
		if (e.success) {
			alert('Success: Logged out');
			Alloy.createController('askForLogin').getView().open();
			$.teacherHome.close();
			Ti.App.Properties.setString('user', null);
		} else {
			alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
}