# Hello World ✨
[Hello World](https://helloworld.social) is a social connection web application that allows users to discover their Ethereum network.

The application offers a variaty of features, such as:
- **follow**/**unfollow** Ethereum addresses and get interesting **Featured profiles** and **Recommendations** users might like;
- discover the common **NFT Collections** and **POAPs** with other addresses;
- search for an ethereum address and check out the profile;
- view **Balance**, **Tokens**, **ERC20 Transfers**, **ERC721 Transfers**, **POAPs** and **NFTs** for any user profile.<br>

Project link: https://helloworld.social<br>
Public repo: https://github.com/SamixDev/hello-world<br>
Recorded video demo of CyberConnect API integration: https://youtu.be/Kv1_VvPineE<br>
Recorded video demo of Unstoppable Domains Login integration: https://youtu.be/pCX0SSV39jk<br>

![landing](https://user-images.githubusercontent.com/39951422/153298096-8f06b77d-36e0-497c-af87-fa63eea6d912.png)

# Setup
## Prerequisites needed:
  - [Node 12 or better](https://nodejs.org/en/)
  - [Covalent API key](https://www.covalenthq.com/platform/#/auth/register/)
  - [EtherScan API key](https://etherscan.io/myapikey)
  - [Moralis Server & APP ID](https://admin.moralis.io/servers)
  - [Unstoppable Domains credentials](https://unstoppabledomains.com/apps)

## Steps to set the Backend running:
1. Set the following variables in ```.env```
- ```COV_API=https://api.covalenthq.com/v1```
- ```COV_KEY=``` Covalent API key
- ```PORT=2500``` 
- ```MORALIS_SERVER_URL=``` Moralis Server URL
- ```APPID=``` Moralis APP ID
- ```ETHERSCAN_API_KEY=``` EtherScan API key
3. install npm dependencies with ```$ npm install```;
4. run the project with the command ```$ npm start```;

## Steps to set the Client running:<br>
1) go to the Client folder directory;
2) make sure you do not have anything running on port 3000;
3) install the Node dependencies by running ```$ yarn``` in the terminal;
4) open a new terminal and run the command ```$ yarn start``` (make sure you are in the right directory);
5) set in the ```.env``` the Unstoppable Domains credentials.

## Thank you!
If you like our app and would like to stay up to date with the latest developments, kindly consider:
- star the project on Github: https://github.com/SamixDev/hello-world;
- follow it on Twitter: https://twitter.com/hwdotsocial.
