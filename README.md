# Weolcome to User Authentication API

This api provides complete user/admin Authentication features. some restrictions for users also added. for better understanding please read carefully below.

## End points

    /
    Welcome Page
    ------------------------------------

## Sign up

    /user/singup
    for registering a new user/admin

    fields
     {
        username,
        email,
        dob,
        role,
        location,
        password,
        confirm_password
    }
    -role only can be  - "Admin" or "Explorer"
    -----------------------------------------------

## Login

    /user/login
    for singin already registered user/admin

    fields
    {
        email,
        passowrd
    }

    when user is singed in successfully you will get response as.
    {
        username,
        role,
        token
    }
    you have to store token for access the protected routes
    -----------------------------------------------

# Protected Routes

## For all user Details Only accessible for admin

    /user/allusers
    it will return all the users details. you have to send a token through request header.

    headres {
               authorization:`Barear your-token`
           }

## for particular user details

    /user/singleuser/:id

    :id  --> user id

    authorization token is also required for this action

## for update any user details Only accessible for admin

    /user/edit/:id

     :id  --> user id

    fields that you want to update should be one/all of these fields
     {
        username,
        email,
        dob,
        role,
        location,
        password,
        confirm_password
    }
    authorization token is also required for this action

## for delete any user details Only accessible for admin

    /user/delete/:id

     :id  --> user id

    authorization token is also required for this action
