# Udacity Project 3: Mobile Flash Cards

![Mobile Flashcards in action](https://firebasestorage.googleapis.com/v0/b/portfolio-6c8cc.appspot.com/o/projects%2Fmobile-flashcards-2.gif?alt=media&token=d4321899-fbce-4cbb-9f8c-4d7b1c9eb827)

This project is a part of Udacity’s [React Nanodegree](https://www.udacity.com/course/react-nanodegree--nd019). Important note to the user: I chose to do an iOS only mobile application. So if you do not have an iOS device you will have to use an iPhone simulator on your Mac.

## Installation

### Downloading the Repo / Setting up the Developer Environment

1.  Run `git clone https://github.com/iwakoscott/mobile-flashcards.git` or download a `.zip` from the [Github repository](https://github.com/iwakoscott/mobile-flashcards).
2.  Run `yarn install` to download dependencies.

### Using your iPhone

Installing this application onto a simulator or your actual phone is quite simple using Expo.

1.  Make sure you have the Application downloaded on your iPhone. If you don’t already have the Expo Application downloaded on your iPhone, [click here]([‎https://itunes.apple.com/app/apple-store/id982107779). The cool thing about Expo is that after downloading the application, you don’t even need to sign up for an account to get your app up and running on your iPhone.
2.  After downloading the App on your iPhone, head over to your terminal and `cd` into `mobile-flashcards` directory that you cloned.
3.  Once you are in `mobile-flashcards` run `exp start && exp send -s <your-phone-number-or-email>` . The `exp send -s <your-phone-number-or-email>` is required for iOS devices which will send a link to your iPhone via email or text. Once you get the link, click the link and the app will magically open on your iPhone✨.

### Using the iPhone Simulator

This requires Xcode already installed on your laptop: [Xcode - Apple Developer](https://developer.apple.com/xcode/)

1.  Within the root directory of `mobile-flashcards`, run `exp ios && exp start`
2.  This will open up the Expo app in Xcode’s iPhone simulator. It may work out of the box, however, I ran into some issues getting the simulator to open up my Application in Expo. You may be presented with this error in the simulator:

![Step 1](https://firebasestorage.googleapis.com/v0/b/github-battle-56499.appspot.com/o/Simulator%20Screen%20Shot%20-%20iPhone%207%20-%202018-07-02%20at%2019.21.26%20copy.png?alt=media&token=43baf2c6-21c3-43a4-82ce-4c10bf41b74a)

If so, click on the “Go Back to Expo Home“ button (outlined in red in the screenshot) and then
click the “Projects” tab in the lower left corner (again outlined in red in the screenshot below)

![Step 2](https://firebasestorage.googleapis.com/v0/b/github-battle-56499.appspot.com/o/Simulator%20Screen%20Shot%20-%20iPhone%207%20-%202018-07-02%20at%2019.39.01.png?alt=media&token=fa9d7ac5-d340-4a8e-b6fb-9e421d16b7fa)

Then, in the upper right corner click the “+” icon.
![Step 3](https://firebasestorage.googleapis.com/v0/b/github-battle-56499.appspot.com/o/Simulator%20Screen%20Shot%20-%20iPhone%207%20-%202018-07-02%20at%2019.42.40.png?alt=media&token=74a7da79-78b1-405a-8914-0819b4039997)

And then you will be presented with the following dialogue:
![Step 4](https://firebasestorage.googleapis.com/v0/b/github-battle-56499.appspot.com/o/Simulator%20Screen%20Shot%20-%20iPhone%207%20-%202018-07-02%20at%2019.44.14.png?alt=media&token=c589d1db-7cbf-49dc-92ae-a2029acbef51)

Go back to your terminal and copy the url located immediately underneath the QR code. Your URL may be a little bit different than the one listed in the screenshot below.
![Step 5](https://firebasestorage.googleapis.com/v0/b/github-battle-56499.appspot.com/o/Screen%20Shot%202018-07-02%20at%207.45.04%20PM.png?alt=media&token=fd65421c-7a75-4dff-9aa0-0a97e6d7a593)

Paste the URL into the dialogue open in the simulator and then click “Open” and the application should start! ✨

![Step 6](https://firebasestorage.googleapis.com/v0/b/github-battle-56499.appspot.com/o/Simulator%20Screen%20Shot%20-%20iPhone%207%20-%202018-07-02%20at%2019.47.15.png?alt=media&token=74c84a65-d155-406a-b110-bbdb6b69379e)

#### Shout out to these two libraries that helped me do some really cool animations!

1.  [react-native-deck-swiper](https://github.com/alexbrillant/react-native-deck-swiper)
2.  [react-native-card-flip](https://github.com/lhandel/react-native-card-flip#readme)
