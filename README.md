## Create a web app with React that allows for users to generate and download memes using the https://memegen.link/ website.

It should allow the user to:

- [x] Enter text for the top and bottom of the meme
  - [x] The top text box needs to have a label element associated with it containing the text Top text
  - [x] The bottom text box needs to have a label element associated with it with the text Bottom text
  - [x] Both text boxes should be empty when the page first loads
- [x] Preview the generated meme
  - [x] The image element needs to have an html attribute set as follows: data-test-id="meme-image"
    - [x] This image element should show a working image when the page first loads
- [x] Change the meme template (the background image)
  - [x] The meme template selector element needs to have a label element associated with it containing the text Meme template
        If the user follows the steps below, the doge meme template needs to be selected:
    - [x] Click on the label of the meme template selector
    - [x] Clear any existing value (eg. with a text box)
    - [x] Type the text doge
    - [x] Hit enter
- [ ] Download the meme by clicking on a button
  - [ ] The button element needs to contain the text Download

## Stretch goals:

    - [ ]  Reduce the amount of times a meme image is generated (don't generate it every time a user presses a key). Instead, generate a new image when the user clicks a button
    - [ ] The button element needs to have an html attribute set as follows: data-test-id="generate-meme"
    - [ ]  Use a #, ? and / in your meme text
    - [ ]  Save a history of generated meme top text, bottom text, and meme photo type. This history should reappear on refresh of the application.

    - [ ] Make your application work offline (without a network connection) with the PWA capabilities built in to create-react-app. Any meme images that were generated while online in the application should be available to be generated again offline as well.
    - [ ] Create a favicon that identifies your app: (see Generating and Adding Favicons)
