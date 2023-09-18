## Mycontacts-backend

# Workflow:
 - A user needs to be registered if doesn't exist
 - Then the user needs to login with email and password as payload
 - Only a loggged in user will be able to fetch the current user Info

 # For contact creation :
  - Logged in user can only perform CRUD
  - For fetching all contacts result ill be all the contacts created by the logged in user
  - Can create  contact wit req payload
  - Can only update/delete self created contact with the contact id