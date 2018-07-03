# Udacity Project 3: Mobile Flash Cards
This project is apart of Udacity’s [React Nanodegree](https://www.udacity.com/course/react-nanodegree--nd019). Important note to the user: I chose to do an iOS only mobile application. So if you do not have an iOS device you will have to use an iPhone simulator.

## Installation
### Downloading the Repo / Setting up the Developer Environment
1. Run `git clone https://github.com/iwakoscott/mobile-flashcards.git` or download a `.zip` from the [Github repository](https://github.com/iwakoscott/mobile-flashcards).
2. Run `yarn install` to download dependencies.

### Using your iPhone
Installing this application onto a simulator or your actual phone is quite simple using Expo.
1. Make sure you have the Application downloaded on your iPhone. If you don’t already have the Expo Application downloaded on your iPhone, [click here]([‎https://itunes.apple.com/app/apple-store/id982107779). The cool thing about Expo is that after downloading the application, you don’t even need to sign up for an account to get your app up and running on your iPhone.
2. After downloading the App on your iPhone, head over to your terminal and `cd` into `mobile-flashcards` directory that you cloned.
3. Once you are in `mobile-flashcards` run `exp start && exp send -s <your-phone-number-or-email>` . The `exp send -s <your-phone-number-or-email>` is required for iOS devices which will send a link to your iPhone via email or text. Once you get the link, click the link and the app will magically open on your iPhone✨.

### Using the iPhone Simulator
This requires Xcode already installed on your laptop: [Xcode - Apple Developer](https://developer.apple.com/xcode/)
1. Within the root directory of `mobile-flashcards`, run `exp ios && exp start`
2. This will open up the Expo app in Xcode’s iPhone simulator. It may work out of the box, however, I ran into some issues getting the simulator to open up my Application in Expo. You may be presented with this error in the simulator:


![](READMD/Simulator%20Screen%20Shot%20-%20iPhone%207%20-%202018-07-02%20at%2019.21.26.png)


If so, click on the “Go Back to Expo Home“ button (outlined in red in the screenshot) and then 
click the “Projects” tab in the lower left corner (again outlined in red in the screenshot below)

![](READMD/Simulator%20Screen%20Shot%20-%20iPhone%207%20-%202018-07-02%20at%2019.39.01.png)

Then, in the upper right corner click the “+” icon.
![](READMD/Simulator%20Screen%20Shot%20-%20iPhone%207%20-%202018-07-02%20at%2019.42.40.png)

And then you will be presented with the following dialogue:
![](READMD/Simulator%20Screen%20Shot%20-%20iPhone%207%20-%202018-07-02%20at%2019.44.14.png)

Go back to your terminal and copy the url located immediately underneath the QR code. Your URL may be a little bit different than the one listed in the screenshot below.
![](READMD/Screen%20Shot%202018-07-02%20at%207.45.04%20PM.png)

Paste the URL into the dialogue open in the simulator and then click “Open” and the application should start! ✨