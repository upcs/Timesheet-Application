-----------------------------------------
QUALITY ATTRIBUTES
-----------------------------------------
1. Correctness
2. Accessability 
3. Manageability 
4. Efficiency
5. Useability
6. Safety

------------------------------------------
SPRINT 3 FEATURES
------------------------------------------
1.) FireStore Database <br>
    1.1) Majority of Server Side completed<br>
    1.2) Database heirarchy completed<br>
2.) Code Coverage Reported<br>
3.) Sign in<br>
    3.1) Users may now sign in via company email <br>
4.) Admin Employee List<br>
    4.1) Admin Employee List now populated with employees from database<br>
5.) Edit Employee<br>
    5.1) Editing an employee changes their information in the database<br>
    5.2) Deleting employee removes employee from database<br>
6.) Admin Job List<br>
    6.1) Admin Job List now populated with jobs from database<br>
7.) Edit Job List<br>
    7.1) Editing a job now edits job info in database<br>
    7.2) Deleting a job removes job from database<br>
    7.3) List of employee per job updates with employees that are on the job<br>
    7.4) Add employee to job list prepopulated with employees that are not on the job<br>
    7.5) Removing an employee from job removes them from that collection in database<br>
8.) Add Employee <br>
    6.1) Creating an employee now adds the employee to the database<br>
9.) Add Job<br>
    9.1) Creating a job now adds the job to the database<br>
10.) Employee Daily/Weekly Time<br>
    10.1) Employee Daily/Weekly Time page pulls data from database<br>
11.) Time punch<br>
    11.1) Clocking in and out adds a time punch to database<br>
12.) Select Job<br>
    12.1) Employees can select which job they would like to bill to<br>
13.) Search Bars<br>
    13.1) Search bars functional using current info from database<br>





-----------------------------------------
SPRINT 2 FEATURES
----------------------------------------
1.) Spash Screen with companu logo <br>
2.) Edit Jobsite Modal <br>
    2.1) When pressing on a job from the list of active jobs a modal pops up <br>
    2.2) Has all the jobs current info <br>
        2.2.1) Has textarea to change the job name <br>
        2.2.2) Has a textarea to change the job address <br>
        2.2.3) Has a list of employees assigned to job <br>
            2.2.3.1) Pressing an employee closes current one and adds a new one with list of employees not assigned to the job <br>
            2.2.3.2) Pressing an employee allows for them to be added to current job <br>
            2.2.3.3) Pressing X closes modal and loads original modal <br>
        2.2.4) Can save changes <br>
        2.2.5) Can delete job <br>
        2.2.6) Can press X to close Modal <br>
3.) Edit Employee Modal <br>
    3.1) When pressing on an employee from active employee list a modal pops up <br>
    3.2) Has all the employee's info <br>
        3.2.1) Textarea to change both first and last name <br>
        3.2.2) Switch to change user account type <br>
        3.2.3) Save changes button <br>
        3.2.4) Delete employee button <br>
        3.2.5) Exit modal button <br>
4.) Add Employee Modal <br>
    4.1) When pressing add employee button a modal pops up<br>
        4.1.1) Can add employees name and password<br>
        4.1.2) Can select user type<br>
        4.2.3) Submit buttom <br>
        4.2.4) Exit Button
5.) Add Jobsite Modal <br>
    5.1) When pressing add jobsite button a modal pops up <br>
        5.1.1) Can change job name, address, adn add notes <br>
        5.1.2) Submit button <br>
        5.1.3) Exit button <br>
6.) Searchbars<br>
    6.1) Searchbars are now functional<br>
7.) Some server side<br>
    7.1) Some of the server side to interact between client and database complete<br>
8.) Mock data<br>
    8.1) Mock data stored which is used in app<br>
9.) Testing<br>
    9.1) Testing for edit job modal complete<br>
    9.2) Testing for edit employee modal complete<br>
    9.3) Testing for add employee modal complete<br>
    9.4) Testing for add jobsite modal complete<br>





------------------------------------------
SPRINT 1 FEATURES
------------------------------------------
1.) React Native and Expo set-up for each team-member <br>
2.) Login Page <br>
    2.1) Company Logo <br>
    2.2) Login Button (Currently not connected to user accounts) <br>
3.) Navigation Between Screens <br>
    3.1) Menu for Admin user to select different screens <br>
    3.2) Menu for Basic user to select different screens <br>
    3.3) 'Swipe' functionality (a user can swipe right or left instead of clicking a button to navigate to a new screen) <br>
4.) Timecard Start/Stop GUI <br>
    4.1) Allows user to start and start time <br>
    4.2) Button changes from 'Start' to 'Stop' when pressed <br>
    4.3) The time between presses is tracked and displayed on screen <br>
5.) Admin Timesheet GUI <br>
    5.1) Search bar to search for a specific employee (searchbar not connected to database) <br>
    5.2) Button to sort by data (button currently non-functional but exists on screen) <br>
    5.3) Scrollable list to sort through employees (list populated with static data currently) <br>
6.) Employee Hours Worked GUI <br>
    6.1) Shows an employyes daily and weekly hours (populated with static data for now) <br>
7.) Admin Add Employee GUI <br>
    7.1) Button for admin to add an employee (non-functional) <br>
    7.2) Searchbar for Admin to search for employee (non-functional) <br>
    7.3) List of employees to scroll through (pre-populated data) <br>
8.) Admin add jobsite GUI <br>
    8.1) Button for admin to add jobsite (non-functional) <br>
    8.2) Searchbar for admin to search for a job (non-functional) <br>
    8.3) List of jobsites for admin to scroll through (pre-populated data) <br>
9.) Employee View Jobsite GUI <br>
    9.1) Text for job name (pre-populated) <br>
    9.2) Text for job address (pre-populated) <br>
    9.3) Upload safety docs button (non-functional) <br>
    9.4) Upload pictured button (non-functional) <br>
