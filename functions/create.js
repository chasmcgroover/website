import Swal from "sweetalert2";
import jQuery from "jquery"
import Moralis from "moralis-v1";
import { encrypt_soln, sleep } from "./baseFunc";
import axios from "axios";
require("dotenv").config()
function update_loggedin() {
    window.in_progress || (window.user ? (jQuery("#formMustLogin").css("display", "none"), jQuery("#formCreatePuzzle").css("display", "")) : (jQuery("#formMustLogin").css("display", ""), jQuery("#formCreatePuzzle").css("display", "none")))
}

function swal_error(e) {
    Swal.fire({
        icon: "error",
        title: "Error",
        text: e
    })
}

async function getBase64FromFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader.result)
        }
        reader.onerror = (error) => {
            reject(error)
        }
        reader.readAsDataURL(file)
    });
}

async function uploadFile(i) {
    try {
      const base64String = await getBase64FromFile(i);
      const options = [
        {
          path: Date.now() + "-" + i.name,
          content: base64String,
        },
      ];
  
      const response = await new Promise((resolve, reject) => {
        axios
          .post(
            'https://deep-index.moralis.io/api/v2/ipfs/uploadFolder',
            options,
            {
              headers: {
                'X-API-KEY': 'uGwdGqa7VC0mEGqxlWMOvhqN24FQEvDrgjHVFbrBcWey8H3D1z7Kg8q7b8s1oFOT',
                'Content-Type': 'application/json',
                'accept': 'application/json',
              },
              maxBodyLength: Infinity,
            }
            )
            .then((res) => resolve(res.data))
            .catch((err) => reject(err));
        });
        console.log(response[0].path);
        return response[0].path;
    } catch (error) {
        console.error("Error processing file:", error);
        return null;
    }
}  
  
export async function create_puzzle() {
    var e = jQuery("#title").val().trim();
    if (e.length < 5) swal_error("Title length too short");
    else if (60 < e.length) swal_error("Title length must be less than 60 characters");
    else {
        var r = jQuery("#desc").val().trim();
        if (r.length < 2) swal_error("Must have a puzzle description");
        else if (5e3 < r.length) swal_error("Title length must be less than 5000 characters");
        else {
            var a = jQuery("#soln").val().trim();
            if (a.length < 4) swal_error("Must have a puzzle solution of at least 4 characters");
            else if (5e3 < a.length) swal_error("Solution length must be less than 5000 characters");
            else {
                var s = jQuery("#creator").val().trim();
                if (s.length < 1) swal_error("Must provide a puzzle creator name");
                else if (40 < s.length) swal_error("Puzzle creator must be less than 40 characters");
                else {
                    var t = parseFloat(jQuery("#puzzleReward").val());
                    if (isFinite(t))
                        if (1e-5 < t && t < 1e5)
                            if (0 == (n = jQuery("#puzzleArt")[0].files).length) swal_error("Puzzle art is required");
                            else {
                                var n = n[0];
                                if (["image/gif", "image/jpeg", "image/png"].includes(n.type))
                                    if (0 == (i = jQuery("#puzzleGraphic")[0].files).length) swal_error("Puzzle graphic is required");
                                    else {
                                        var o = "unlisted" == jQuery("input[name=puzzleVisibility]:checked").val(),
                                            i = i[0];
                                        if (["image/gif", "image/jpeg", "image/png"].includes(i.type)) {
                                            window.in_progress = !0, jQuery("#formCreatePuzzle").css("display", "none"), jQuery("#sectionProgress").css("display", ""), jQuery("#sectionProgress").html(""), progressLine("Uploading puzzle to blockchain... Please do not close this page."), progressLine("Uploading art...");
                                            var l, image = await uploadFile(n);
                                                if (image == null){
                                                    var confirmation = await Swal.fire({
                                                        icon: "error",
                                                        title: "Error!",
                                                        text: "Error uploading image",
                                                        confirmButtonText: "Ok"
                                                    })
                                                    window.location.reload()
                                                    return
                                                }
                                                console.log(image);
                                                progressLine("Uploading graphic...");
                                                var graphic = await uploadFile(i);
                                                if (graphic == null){
                                                    console.log
                                                    var confirmation = await Swal.fire({
                                                        icon: "error",
                                                        title: "Error!",
                                                        text: "Error uploading graphic",
                                                        confirmButtonText: "Ok"
                                                    })
                                                    window.location.reload()
                                                    return
                                                }
                                                var d = (console.log(graphic), progressLine("Generating reward wallet..."), window.web3_bsc.eth.accounts.create()),
                                                s = (progressLine("Reward wallet address: " + d.address), progressLine("Reward recovery key (please retain the recovery key until the puzzle creation process has completed):<br> " + btoa(JSON.stringify({
                                                    pk: d.privateKey
                                                }))), progressLine("Sending reward BNB to reward wallet... <b>Please confirm the reward transaction through your wallet</b>"), {
                                                    to: d.address,
                                                    from: window.ethereum.selectedAddress,
                                                    value: window.web3_bsc.utils.toHex(Math.round(1e18 * t)),
                                                    data: window.web3_bsc.utils.toHex("creator=" + s),
                                                    gasLimit: 25e3
                                                }), logg = (console.log("Calling the function")),
                                                s = await window.ethereum.request({
                                                    method: "eth_sendTransaction",
                                                    params: [s]
                                                }),
                                                logg = (console.log("Called the function")),
                                                s = (progressLine("Reward sent: BSC transaction <a target='_blank' href='" + window.BSCSCAN + "/tx/" + s + "'>" + s + "</a>"), "TreasureHunt: " + e),
                                                u = "NFT earned upon solving the TreasureHunt puzzle named '" + e + "' - see " + window.TREASURE_HUNT_URL,
                                                a = encrypt_soln(a, d.privateKey),
                                                s = (console.log(a), await uploadNFT(s, u, window.ethereum.selectedAddress, e, r, image, graphic, a[0], a[1], t, d.address, o));
                                            for (console.log(s), progressLine("Waiting for NFT to appear on blockchain...");;) {
                                                l = await Moralis.Web3API.account.getNFTs({
                                                    chain: window.CHAIN_HEX,
                                                    address: d.address,
                                                    tokenAddresses: [window.NFT_CONTRACT_ADDRESS],
                                                    disableTotal: false
                                                })
                                                console.log(l)
                                                if (0 < (l.total)) break;
                                                console.log("Checking..."), await sleep(1e4)
                                            }
                                            u = l.result[0].token_id;
                                            try {
                                                await Moralis.Web3API.token.reSyncMetadata({
                                                    chain: window.CHAIN_HEX,
                                                    address: window.NFT_CONTRACT_ADDRESS,
                                                    tokenId: "" + u,
                                                    flag: "uri",
                                                    mode: "sync"
                                                })
                                            } catch {}
                                            progressLine("Puzzle minted: BSC transaction <a href='" + window.BSCSCAN + "/tx/" + s + "'>" + s + "</a>");
                                            e = "/puzzle/" + u;
                                            progressLine("<h4>Congratulations! Your puzzle has been created.</h4>"), progressLine("<a href='" + e + "'>Click here to view your puzzle</a>"), progressLine("Would you like to <a href='/create'>create another puzzle</a>?")
                                        } else swal_error("Puzzle graphic must be in PNG, JPG, or GIF form")
                                    }
                                else swal_error("Puzzle art must be in PNG, JPG, or GIF form")
                            }
                    else swal_error("Reward must be between 0.00001 and 100000 BNB");
                    else swal_error("Invalid reward")
                }
            }
        }
    }
}

async function uploadNFT(e, r, a, s, t, n, o, i, l, d, u, c) {
    e = {
        name: e,
        description: r,
        image: n,
        puzzle_title: s,
        puzzle_description: t,
        puzzle_graphic: o,
        solution_hash: i,
        solution_reward: l,
        reward_amount: parseFloat(d.toFixed(4)).toString(),
        treasurehunt: window.treasurehunt,
        creator_addr: a,
        reward_addr: u,
        unlisted: c || !1
    };
    console.log(e)
    progressLine("Uploading metadata...");
    const options = {
        abi: [
            {
              path: Date.now()+"-"+"metadata.json",
              content: btoa(JSON.stringify(e)),
            },
        ],
    };
    const path = await Moralis.Web3API.storage.uploadFolder(options);
    const uri = path[0].path
    progressLine("Minting NFT... <b>Please confirm the NFT-minting transaction through your wallet</b>");
    n = await mintToken(u, uri);
    return n
}
async function mintToken(e, r) {
    e = window.web3_bsc.eth.abi.encodeFunctionCall({
        name: "mintToken",
        type: "function",
        inputs: [{
            type: "address",
            name: "rewardWallet"
        }, {
            type: "string",
            name: "tokenURI"
        }]
    }, [e, r]), r = {
        to: window.NFT_CONTRACT_ADDRESS,
        from: window.ethereum.selectedAddress,
        data: e
    };
    return await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [r]
    })
}

function progressLine(e) {
    jQuery("#sectionProgress").html(jQuery("#sectionProgress").html() + e + "<br>")
}

export function initFunction(){
    window.in_progress = !1, window.user = Moralis.User.current(), setInterval(update_loggedin, 500);
}