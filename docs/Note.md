Agents Rules :
Do not verify in the web browser until i told you .
when migrating or merging an element , confirm if its correctly moved befor cleaning it up .
###############################################

# Check what changed in your files

git status

# Save your changes locally (create a commit)

git add .                     # Stage all changes
git commit -m "Added new feature"  # Commit with a message

# Upload your changes to GitHub

git push

# Download latest changes from GitHub

git pull
###############################################
###############################################
chek for a safe cleanup :

update the Page Migrations in the plan to reflect all the current elements and buttons across all the webapp and make sure to not losing actual features and functionality through the procces .

apply the plan ..

look for remeaning usage of HeaderTabs ,RightPanelContext , SplitLayout .
PAGE_INFO_CONFIG in SecondTopBar -> safely remove if not neded .
###############################################
Work only on UI/UX:
Devlope an enterprise Approach for Modes switching and collaboratiolns Integration :

Lets say that i have an Ecommerce bussines with a multipule Teams like sales team , marketing team , ads team , Reasearch team ....
each team have his own page to work on it .
as an admin , i should be able to navigate across all the webapp , manage teams and accesss , but other users should not .
in the admin mode : collaboratioln icons should show all real time active teams icon with a configuration icon so the admin can configurate and active / disactive team access on each activated team pages .

mock and synce :
sync the Mocks of the Active Teams Display and all the ecosystem bar pannels for all pages and modes .
session objectives and configs , todos lists (admin list - team list) , comunucation layer and chats (admin chat - team chat) .
Module Button should use the ecossytem bar pop modal and showing the view according to the current mode and session .
###############################################
update all documentations and configurations files to reflect the actual current codebase .
check thefor not longer and unecesery documentations to clean up .
push to github .
###############################################
enterprise dashboard Global UI/UX Unified context-aware enhacement :
top navigation dynamic elements .  
ecosystem bar tabs system .

Visual board to manage stages
Promotional or access banner for services
A grid of clickable cards to open specific tools
Active Tool Panel (Dynamic)

Advanced tabes system , remember behavior ;;;;;
Look for aalready existing features that have oportunitys to apply a similar modal pattern to :
the side by side sections in a column grid layout modal .
the Content Pipeline modal .
(Step-by-step creation) CreationWizard
###############################################
import exports , reports and emails and therd party integrations .
data tranfer between admin and teams .
