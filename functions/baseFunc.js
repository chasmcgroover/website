import Moralis from "moralis-v1"
import Swal from "sweetalert2";
import jQuery from "jquery"
require('dotenv').config();
import Web3 from "web3";
import nacl from "tweetnacl"
import { encodeBase64, decodeBase64, encodeUTF8, decodeUTF8 } from "tweetnacl-util";
const web3_bsc = new Web3("https://bsc-dataseed.binance.org")
export async function setup_load(e) {
    window.cfg = { only_solved: e };
}
import axios from "axios";

//import { useMoralisQuery } from "react-moralis";

const SALT_KEY = decodeBase64("HYZAgC1Z/skSs8FZvL0TCp+ZGU59onmjdkEQZvSd1DU="),
SALT_KEY2 = decodeBase64("/7eJ3nUtSL9AW+WRl36QDs6BGcE2WPypc2lv42axg6E="),
PAD = "hlOLqp2hvWA40ni8XW6ERSOH3x",
HASH_NONCE = decodeBase64("sAOAEli24spWsY8/4IaZ+W6EqJ436CY1");
//math functions
function abs(n){return n>=0?n:-n}function bitLength(n){if("number"==typeof n&&(n=BigInt(n)),1n===n)return 1;let t=1;do t++;while((n>>=1n)>1n);return t}function eGcd(n,t){if("number"==typeof n&&(n=BigInt(n)),"number"==typeof t&&(t=BigInt(t)),n<=0n||t<=0n)throw RangeError("a and b MUST be > 0");let e=0n,r=1n,o=1n,u=0n;for(;0n!==n;){let f=t/n,i=t%n,m=e-o*f,b=r-u*f;t=n,n=i,e=o,r=u,o=m,u=b}return{g:t,x:e,y:r}}function gcd(n,t){let e="number"==typeof n?BigInt(abs(n)):abs(n),r="number"==typeof t?BigInt(abs(t)):abs(t);if(0n===e)return r;if(0n===r)return e;let o=0n;for(;((e|r)&1n)===0n;)e>>=1n,r>>=1n,o++;for(;(1n&e)===0n;)e>>=1n;do{for(;(1n&r)===0n;)r>>=1n;if(e>r){let u=e;e=r,r=u}r-=e}while(0n!==r);return e<<o}function lcm(n,t){return("number"==typeof n&&(n=BigInt(n)),"number"==typeof t&&(t=BigInt(t)),0n===n&&0n===t)?BigInt(0):abs(n/gcd(n,t)*t)}function max(n,t){return n>=t?n:t}function min(n,t){return n>=t?t:n}function toZn(n,t){if("number"==typeof n&&(n=BigInt(n)),"number"==typeof t&&(t=BigInt(t)),t<=0n)throw RangeError("n must be > 0");let e=n%t;return e<0n?e+t:e}function modInv(n,t){let e=eGcd(toZn(n,t),t);if(1n===e.g)return toZn(e.x,t);throw RangeError(`${n.toString()} does not have inverse modulo ${t.toString()}`)}function mathematic(n,t,e){if("number"==typeof n&&(n=BigInt(n)),"number"==typeof t&&(t=BigInt(t)),"number"==typeof e&&(e=BigInt(e)),e<=0n)throw RangeError("n must be > 0");if(1n===e)return 0n;if(n=toZn(n,e),t<0n)return modInv(modPow(n,abs(t),e),e);let r=1n;for(;t>0;)t%2n===1n&&(r=r*n%e),t/=2n,n=n**2n%e;return r}


export async function setup_variables(setUser){
    window.treasurehunt = "v001"
    window.NFT_CONTRACT_ADDRESS = "0x3e0abc4cd3269a0283349a1dc5a18bfe6f153224"
    window.web3_bsc = new Web3("https://bsc-dataseed.binance.org")
    window.TREASURE_HUNT_URL = "https://treasurehunttoken.com/"
    window.BSCSCAN = "https://bscscan.com"
    window.CHAIN = "bsc"
    window.CHAIN_ID = 56
    window.CHAIN_HEX= "0x38"
    window.BLACKLIST = ["73","72","71","70","87","1","2","96","108","124","153"]
    window.serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
    window.appId = process.env.NEXT_PUBLIC_APP_ID
    //starting moralis
    Moralis.start({
        appId: window.appId,
        serverUrl: window.serverUrl,
        defaultEvmApiChain: window.CHAIN_ID,
        apiKey: process.env.API_KEY
    })
    // Parse.initialize("aaa", "", "93286200c8b2aa795b5534e31a828ceb")
    // Parse.serverURL = process.env.NEXT_PUBLIC_SERVER_URL
    // Parse.masterKey = "93286200c8b2aa795b5534e31a828ceb"
    // window.user = null, setTimeout(get_exchange_rates, 10), localStorage.getItem("currency") || localStorage.setItem("currency", "BNB"), $("#currencySelect").val(localStorage.getItem("currency")).change(function() {
    //     localStorage.setItem("currency", $("#currencySelect").val()), window.location.reload()
    // }), setInterval(scale_parchment, 500), window.user = Moralis.User.current(), setInterval(update_user, 500);
    window.user = null;
    setTimeout(get_exchange_rates, 10);
    localStorage.getItem("currency") || localStorage.setItem("currency", "BNB");

    // Replace the "$" with "jQuery" or the new alias if using jQuery.noConflict()
    jQuery("#currencySelect").val(localStorage.getItem("currency")).change(function() {
        localStorage.setItem("currency", jQuery("#currencySelect").val());
        window.location.reload();
    });

    setInterval(scale_parchment, 500);
    window.user = Moralis.User.current();
    setUser(window.user)
    setInterval(update_user, 500);
    

}
export async function get_exchange_rates() {
    var e;
    window.exchange_rates || (e = await (e = await fetch("https://www.binance.com/api/v3/ticker/price?symbol=BNBUSDC")).json(), e = parseFloat(e.price), window.exchange_rates = {}, window.exchange_rates.USD = e)
}
export async function format_currency(e) {
    var t = localStorage.getItem("currency");
    console.log(e, ": -> This is e")
    return "BNB" == t ? parseFloat(e.toFixed(4)).toString() + " BNB" : (await get_exchange_rates(), window.exchange_rates[t] ? (e * window.exchange_rates[t]).toFixed(2) + " " + t : parseFloat(e.toFixed(4)).toString() + " BNB")
}

export function scale_parchment() {
    jQuery(".parchment").height(jQuery("body").height() - 230)
}

export async function login() {
    window.user = Moralis.User.current(), window.user || (window.user = await handleAuth("metamask")), console.log("logged in user:", user), window.location.reload()
}
export async function login_logout() {
    window.user ? Swal.fire({
        title: "Would you like to log out?",
        showDenyButton: !0,
        confirmButtonText: "Log out",
        denyButtonText: "Cancel"
    }).then(async e => {
        e.isConfirmed && (window.user = null, await Moralis.User.logOut(), window.location.reload())
    }) : await login()
}

export function shorten_addr(e) {
    return e = e.slice(0, 6) + ".." + e.slice(e.length - 4, e.length)
}
async function switch_chain() {
    try {
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{
                chainId: "0x" + window.CHAIN_ID.toString(16)
            }]
        })
    } catch (e) {
        4902 === e.code || -32002 == e.code ? Swal.fire({
            title: "Select Chain",
            text: "Please switch your wallet to the chain " + window.CHAIN.toUpperCase()
        }) : Swal.fire({
            icon: "error",
            title: "Error",
            text: `Error ${e.code}: ` + e.message
        })
    }
}

export function hash_str(e) {
    var hh = encodeBase64(nacl.hash(decodeUTF8(e)));
    hh = encodeBase64(nacl.hash(decodeUTF8(hh)));
    /*defense in depth*/
    hh = encodeBase64(nacl.hash(decodeUTF8(hh)));

    hh = hh +"."+ SALT_KEY2;
    
    var hh2 = BigInt(0);

    for (var i = 0; i < hh.length; i++) {
        hh2 = (hh2 << BigInt(8)) + BigInt(hh.charCodeAt(0));
    }

    hh = mathematic(hh2, BigInt(65537), BigInt("2933513246627580364141974824910272334944648573837141561255927138093643428389882442532446759321663580026646253077539733478646046838901209715307512740250307916924674115916046854359376264328491788268404554366593628833650344268448520682993862241435054440816010317783165801561057550380452945181206714627220741848482621747665654478085244249912121627789573223463987569166004326122297788297874357032506957023557064148741513238491976898626467312319402714944362795834726817679223085655608261564486969006826933694646990281711696072037411032697341174880051797006066311547679943648623234590207135954434021238012213783105917571177"))
    hh = hh.toString();
    return hh;
}

export async function update_user() {
    window.user && !window.ethereum.selectedAddress && (window.user = null, await Moralis.User.logOut(), window.location.reload());
    var e = window.user ? shorten_addr(window.user.get("ethAddress")) : "Log in";
    jQuery("#user_addr").html(e), window.user ? parseInt(window.ethereum.chainId) == window.CHAIN_ID || window.switch_attempted || (window.switch_attempted = !0, await switch_chain()) : window.switch_attempted = !1
}

export function derive_key(e) {
    for (var t = 0; t < 100; t++) e = encodeBase64(nacl.hash(decodeUTF8(e)));
    return nacl.hash(decodeUTF8(e)).slice(0, nacl.secretbox.keyLength)
}

function enc_with_key(e, t) {
    var n = nacl.randomBytes(nacl.secretbox.nonceLength),
        e = nacl.secretbox(decodeUTF8(e), n, t);
    return encodeBase64(n) + ":" + encodeBase64(e)
}

export function dec_with_key(e, t) {
    var n = decodeBase64(e.split(":")[0]),
        e = (e = decodeBase64(e.split(":")[1]), nacl.secretbox.open(e, n, t));
    return encodeUTF8(e)
}

export function encrypt_soln(e, t) {
    var n = derive_key(e);
    return [hash_str(e), enc_with_key(t, n)]
}

export function sleep(t) {
    return new Promise(e => setTimeout(e, t))
}

export function escape_text(e) {
    return document.createElement("div").appendChild(document.createTextNode(e)).parentNode.innerHTML
}
async function fetchDB(n){
    return axios.post('https://backend.treasurehunttoken.com/myowntransaction', {"n": n})
    .then(response => {
        const transactions = response.data;
        // Process the transactions
        return transactions;
    })
    .catch(error => {
        console.error(error);
    });
}
export async function get_values(e) {
    for (var t = {}, n = [], a = 0; a < e.length; a++) t[e[a]] = 0, n.push(e[a].toLowerCase());
    try {
        for (var r = await fetchDB(n), a = 0; a < r.length; a++) t[r[a]["to_address"]] += parseFloat(r[a]["value"]) / 1e18;
        for (a = 0; a < e.length; a++) t[e[a]] = parseFloat(t[e[a]].toFixed(4)).toString();
        return t
    } catch (error) {
        console.error("Error retrieving data:", error);
        return {};
    }
  }
  
async function fix_cache(e) {
    await Moralis.Web3API.token.reSyncMetadata({
        chain: window.CHAIN,
        address: window.NFT_CONTRACT_ADDRESS,
        token_id: "" + e,
        flag: "uri",
        mode: "sync"
    })
}

 /* Authentication code */
 export async function handleAuth(provider) {
    await Moralis.enableWeb3({
      throwOnError: true,
      provider,
    });

    const { account, chainId } = Moralis;

    if (!account) {
      throw new Error('Connecting to chain failed, as no connected account was found');
    }
    if (!chainId) {
      throw new Error('Connecting to chain failed, as no connected chain was found');
    }

    const { message } = await Moralis.Cloud.run('requestMessage', {
      address: account,
      chain: 56,
      network: 'evm',
    });

    await Moralis.authenticate({
      signingMessage: message,
      throwOnError: true,
    }).then((user) => {
      window.user = user;
      console.log(account)
    });
  }