import jQuery from "jquery";
import Moralis from "moralis-v1";
import {get_exchange_rates, escape_text, format_currency,get_values} from "./baseFunc"
export async function update_loggedin() {
    window.user ? (jQuery("#loginContainer").css("display", "none"),
    jQuery("#puzzleContainer").css("display", ""),
    window.cfg && !window.loaded && (await load_puzzles(window.cfg.only_solved))) : (jQuery("#loginContainer").css("display", ""),
    jQuery("#puzzleContainer").css("display", ""),
    window.cfg && !window.loaded && (await load_puzzles(window.cfg.only_solved)));
}
 export async function load_puzzles(e, setLoaded, setFinal) {
        let final = [];
        if (true) {
          //window.loaded = !0,
          await get_exchange_rates();
          var a = await Moralis.Web3API.token.getNFTOwners({
              chain: window.CHAIN_ID,
              address: window.NFT_CONTRACT_ADDRESS,
              disableTotal: false
          }), t = [];
          console.log(a);
          for (var o = 0; o < a.total; o++)
              try {
                  (n = a.result[o])["token_uri"] || await Moralis.Web3API.token.reSyncMetadata({
                      chain: window.CHAIN,
                      address: window.NFT_CONTRACT_ADDRESS,
                      token_id: n.token_id,
                      flag: "uri",
                      mode: "sync"
                  }),
                  n.metadata || (n.metadata = JSON.stringify(await jQuery.get(n.token_uri))),
                  r = JSON.parse(n.metadata),
                  t.push(r.reward_addr.toLowerCase())
              } catch(err) {
                console.log(err);
              }
          console.log(t);
          var i = await get_values(t);
          console.log(i); //jQuery("#puzzleDiv").html("");
          for (o = 0; o < a.total; o++){
              console.log("Iteration:", o)
              try {
                var n = a.result[o]
                  , r = JSON.parse(n.metadata)
                  , d = r.reward_addr.toLowerCase() != n.owner_of.toLowerCase()
                  , s = !1;
                if (e) {
                    if (!d){
                      console.log("Skip 1")
                      continue;
                    }
                } else {
                    if (d){
                      console.log("Skip 2")
                      continue;
                    }
                        
                    if (r.unlisted) {
                        try {
                            if (r.creator_addr.toLowerCase() != window.ethereum.selectedAddress.toLowerCase())
                            {
                              console.log("Skip 3")
                              continue;
                            }
                        } catch {
                            console.log("Skip 4")
                            continue;
                        }
                        s = !0
                    }
                }
                if (r.treasurehunt != window.treasurehunt)
                {
                  console.log("Skip 5")
                  continue;
                }
                if (-1 != window.BLACKLIST.indexOf(n.token_id))
                {
                  console.log("Skip 6")
                  continue;
                }
                console.log("Value of R:", r)
                //jQuery("#noPuzzles").css("display", "none");
                //console.log("Reward:", parseFloat(i[r.reward_addr.toLowerCase()]))
                console.log("Initial Reward:", parseFloat(r.reward_amount))           //------  This and the next comment does not include sponsor amnts.
                //var reward = parseFloat(i[r.reward_addr.toLowerCase()]);
                var reward = parseFloat(r.reward_amount);
                let l = !!(reward)
                reward = await format_currency(reward)
                let c = reward;
                let val = {
                    token_id: n.token_id,
                    image: r.image,
                    puzzle_title: r.puzzle_title,
                    reward: reward,
                    l: l,
                    s: s,
                    c: c
                }
                console.log(val)
                final.push(val)
                //jQuery("#puzzleDiv").html(jQuery("#puzzleDiv").html() + c)
              } catch(error) {
                console.log("Catch skip")
                console.log(error)
              }
          }
          console.log("_____________Final____________")
          console.log(final)
          setFinal(final)
          setLoaded(true)
          //window.loaded = !0
      }
  }
  export async function loadUser() {
    window.user = Moralis.User.current(), setInterval(update_loggedin, 500);
  }