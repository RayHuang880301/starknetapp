(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(3176)}])},4976:function(t,e,n){"use strict";n.d(e,{dq:function(){return i},vb:function(){return o}});var a=n(1860),s=n.n(a),r="STARK_KEY_STORAGE";function o(t){return s().get("".concat(r,"_").concat(t))||""}function i(t,e){return s().set("".concat(r,"_").concat(t),e)}},3176:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return ht}});var a=n(5893),s=n(7294),r=n(5286),o=n(5152),i=n.n(o)()((function(){return n.e(8).then(n.bind(n,8))}),{loadableGenerated:{webpack:function(){return[8]}},ssr:!1}),c=n(1633),u=n.n(c),l=n(3643),p=n(1217),d=n(2732),f=n.n(d),m=n(5961),y=n.n(m),h=n(3750),_=n(1508),v=n(3730),x=n(4051),b=n.n(x),j=n(2882),C=n(9669),g=n.n(C),k=n(1744),S=n(3454);function w(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function A(t,e,n,a,s,r,o){try{var i=t[r](o),c=i.value}catch(u){return void n(u)}i.done?e(c):Promise.resolve(c).then(a,s)}function N(t){return function(){var e=this,n=arguments;return new Promise((function(a,s){var r=t.apply(e,n);function o(t){A(r,a,s,o,i,"next",t)}function i(t){A(r,a,s,o,i,"throw",t)}o(void 0)}))}}function E(t){return function(t){if(Array.isArray(t))return w(t)}(t)||function(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"===typeof t)return w(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return w(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var U=S.env.NEXT_PUBLIC_ETH_ADDRESS||"",M=S.env.NEXT_PUBLIC_PAYMASTER_ADDRESS||"",T=new j.Provider({sequencer:{network:"goerli-alpha"}});function O(){return(O=N(b().mark((function t(e){var n,a,s;return b().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,g()({method:"get",headers:{"Content-Type":"text/plain"},transformResponse:function(t){return t},url:"./Account.txt"});case 2:return n=t.sent,a=j.json.parse(n.data),t.next=6,T.deployContract({contract:a,constructorCalldata:[e],addressSalt:e});case 6:return s=t.sent,t.next=9,T.waitForTransaction(s.transaction_hash);case 9:return t.sent,t.abrupt("return",s);case 11:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function B(t,e,n,a,s,r){return F.apply(this,arguments)}function F(){return(F=N(b().mark((function t(e,n,a,s,r,o){var i,c,u,l;return b().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return i=new j.Account(e,n,s),c=new j.Account(e,a,s),t.next=4,c.getNonce();case 4:return u=t.sent,t.next=7,i.execute([{contractAddress:a,entrypoint:"__execute__"}].concat(E(r)),[[{inputs:[],name:"__execute__",outputs:[],type:"function"}]].concat(E(o)),{nonce:u});case 7:return l=t.sent,t.abrupt("return",l);case 9:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var I=n(8251),P=n(4976),R=n(1664),D=n.n(R),Z={name:"Sign Message",version:"1",chainId:1,verifyingContract:"0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC"},K={Main:[{name:"Authentication",type:"string"},{name:"Action",type:"string"}]},H={Authentication:"StarkNet Hyper Account",Action:"Access to generate your in-app starknet wallet"};function G(){var t,e=function(){return d==t.unCreated?(0,a.jsx)("button",{className:y().btn,onClick:function(){g()},children:(0,a.jsx)("span",{children:"\u2460\xa0\xa0\xa0Authentication"})}):d==t.creating?(0,a.jsx)("button",{className:y().btnEnable,children:(0,a.jsx)("span",{children:"\u2460\xa0\xa0\xa0Estimated ~1 min"})}):(0,a.jsx)("button",{className:y().btnCreated,children:(0,a.jsx)("span",{children:"\u2460\xa0\xa0\xa0Success"})})};!function(t){t[t.unCreated=0]="unCreated",t[t.creating=1]="creating",t[t.created=2]="created"}(t||(t={}));var n=(0,_.pm)(),o=(0,l.oR)().starknetStore,i=(0,s.useState)(""),c=i[0],u=i[1],p=(0,s.useState)(t.unCreated),d=p[0],f=p[1],m=(0,r.yw)({domain:Z,types:K,value:H}),x=m.data,b=m.isError,C=(m.isLoading,m.isSuccess),g=m.signTypedData;return(0,s.useEffect)((function(){d==t.created&&o.setAccountState(!0,!0,!1)}),[d]),(0,s.useEffect)((function(){if(C){f(t.creating);var e=function(t){var e=j.number.toFelt(t);return j.ec.getKeyPair(e)}(String(x));o.keyPair=e;var a=(0,I.getStarkKey)(e),s=(0,P.vb)(a);s?(u(s),o.setStarknetAddress(a,s),f(t.created),n({title:"Success",description:"Account created successfully",status:"success",position:"top",duration:5e3,isClosable:!0})):function(t){return O.apply(this,arguments)}(a).then((function(e){console.log(e),u(e.contract_address),o.setStarknetAddress(a,e.contract_address),T.waitForTransaction(e.transaction_hash).then((function(){f(t.created),n({title:"Success",description:"Account created successfully",status:"success",position:"top",duration:5e3,isClosable:!0})}))}))}else b&&n({title:"Error",description:"Message not signed",status:"error",position:"top",duration:5e3,isClosable:!0})}),[x]),(0,a.jsxs)("div",{className:y().container,children:[(0,a.jsx)("div",{className:y().iconBox,children:d==t.creating?(0,a.jsx)(v.$,{className:y().icon}):(0,a.jsx)(h.wUZ,{className:y().icon,style:d==t.created?{color:"#00D6C1"}:{color:"#FFF"}})}),(0,a.jsxs)("div",{className:y().content,children:[(0,a.jsx)(e,{}),(0,a.jsx)("h6",{children:"One time signature to generate your in-app starknet wallet"}),d==t.created?(0,a.jsx)("div",{className:y().account,children:(0,a.jsxs)("div",{children:["Address:",(0,a.jsx)("br",{}),(0,a.jsx)(D(),{href:"https://goerli.voyager.online/contract/".concat(c),children:(0,a.jsx)("a",{target:"_blank",rel:"noreferrer",children:(0,a.jsx)("span",{className:y().address,children:c})})})]})}):null]})]})}var z=n(6422),q=n.n(z);var J=(0,n(9323).Pi)((function(){var t=(0,s.useState)(!1),e=t[0],n=t[1],r=(0,l.oR)().starknetStore;return(0,s.useEffect)((function(){e&&r.setAccountState(!0,!0,!0)}),[e]),(0,a.jsxs)("div",{className:q().container,children:[(0,a.jsx)("div",{className:q().iconBox,children:(0,a.jsx)(h.XLv,{className:q().icon})}),(0,a.jsxs)("div",{className:q().content,children:[r.accountState==l.eD.ConnetedHasStarkKey?(0,a.jsx)("button",{className:q().btn,onClick:function(){n(!0)},children:"\u2461\xa0\xa0\xa0Enable zero gas fee"}):(0,a.jsx)("button",{className:q().btnDisable,children:"\u2461\xa0\xa0\xa0Enable zero gas fee"}),(0,a.jsx)("h6",{children:"Active zero gas fee function for your hyper account "})]})]})}));function W(){return(0,a.jsxs)("div",{className:f().modal,children:[(0,a.jsx)("div",{className:f().title,children:"StarkNet Hyper Account"}),(0,a.jsx)("div",{className:f().card,children:(0,a.jsx)(G,{})}),(0,a.jsx)("div",{className:f().card,children:(0,a.jsx)(J,{})})]})}var X=n(7145),L=n(1407),Y=n.n(L),$=JSON.parse('[{"members":[{"name":"low","offset":0,"type":"felt"},{"name":"high","offset":1,"type":"felt"}],"name":"Uint256","size":2,"type":"struct"},{"data":[{"name":"previousOwner","type":"felt"},{"name":"newOwner","type":"felt"}],"keys":[],"name":"OwnershipTransferred","type":"event"},{"data":[{"name":"account","type":"felt"}],"keys":[],"name":"Paused","type":"event"},{"data":[{"name":"account","type":"felt"}],"keys":[],"name":"Unpaused","type":"event"},{"data":[{"name":"from_","type":"felt"},{"name":"to","type":"felt"},{"name":"tokenId","type":"Uint256"}],"keys":[],"name":"Transfer","type":"event"},{"data":[{"name":"owner","type":"felt"},{"name":"approved","type":"felt"},{"name":"tokenId","type":"Uint256"}],"keys":[],"name":"Approval","type":"event"},{"data":[{"name":"owner","type":"felt"},{"name":"operator","type":"felt"},{"name":"approved","type":"felt"}],"keys":[],"name":"ApprovalForAll","type":"event"},{"data":[{"name":"from_","type":"felt"},{"name":"to","type":"felt"},{"name":"value","type":"Uint256"}],"keys":[],"name":"Transfer","type":"event"},{"data":[{"name":"owner","type":"felt"},{"name":"spender","type":"felt"},{"name":"value","type":"Uint256"}],"keys":[],"name":"Approval","type":"event"},{"inputs":[{"name":"name","type":"felt"},{"name":"symbol","type":"felt"},{"name":"owner","type":"felt"}],"name":"constructor","outputs":[],"type":"constructor"},{"inputs":[{"name":"interfaceId","type":"felt"}],"name":"supportsInterface","outputs":[{"name":"success","type":"felt"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"name":"name","type":"felt"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"name":"symbol","type":"felt"}],"stateMutability":"view","type":"function"},{"inputs":[{"name":"owner","type":"felt"}],"name":"balanceOf","outputs":[{"name":"balance","type":"Uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"name":"tokenId","type":"Uint256"}],"name":"ownerOf","outputs":[{"name":"owner","type":"felt"}],"stateMutability":"view","type":"function"},{"inputs":[{"name":"tokenId","type":"Uint256"}],"name":"getApproved","outputs":[{"name":"approved","type":"felt"}],"stateMutability":"view","type":"function"},{"inputs":[{"name":"owner","type":"felt"},{"name":"operator","type":"felt"}],"name":"isApprovedForAll","outputs":[{"name":"isApproved","type":"felt"}],"stateMutability":"view","type":"function"},{"inputs":[{"name":"tokenId","type":"Uint256"}],"name":"tokenURI","outputs":[{"name":"tokenURI","type":"felt"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"name":"owner","type":"felt"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"name":"paused","type":"felt"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"name":"totalSupply","type":"Uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"name":"to","type":"felt"},{"name":"tokenId","type":"Uint256"}],"name":"approve","outputs":[],"type":"function"},{"inputs":[{"name":"operator","type":"felt"},{"name":"approved","type":"felt"}],"name":"setApprovalForAll","outputs":[],"type":"function"},{"inputs":[{"name":"from_","type":"felt"},{"name":"to","type":"felt"},{"name":"tokenId","type":"Uint256"}],"name":"transferFrom","outputs":[],"type":"function"},{"inputs":[{"name":"from_","type":"felt"},{"name":"to","type":"felt"},{"name":"tokenId","type":"Uint256"},{"name":"data_len","type":"felt"},{"name":"data","type":"felt*"}],"name":"safeTransferFrom","outputs":[],"type":"function"},{"inputs":[{"name":"to","type":"felt"}],"name":"mint","outputs":[],"type":"function"},{"inputs":[{"name":"tokenId","type":"Uint256"},{"name":"tokenURI","type":"felt"}],"name":"setTokenURI","outputs":[],"type":"function"},{"inputs":[{"name":"newOwner","type":"felt"}],"name":"transferOwnership","outputs":[],"type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"type":"function"},{"inputs":[],"name":"pause","outputs":[],"type":"function"},{"inputs":[],"name":"unpause","outputs":[],"type":"function"}]');function V(t){return(0,X.useContract)({abi:$,address:t})}var Q=n(3747),tt=n(7525),et=n(9653),nt=n(1227),at=n(6101);function st(t,e,n,a,s,r,o){try{var i=t[r](o),c=i.value}catch(u){return void n(u)}i.done?e(c):Promise.resolve(c).then(a,s)}var rt="0x014f90fe1c113d1054c5f420ebb3ab0e039c45d896453ed5059f39dca7e46ae0";function ot(){var t=function(){return c?(0,a.jsx)("button",{className:Y().btnDisable,children:(0,a.jsx)(v.$,{})}):(0,a.jsx)("button",{onClick:function(){return E()},className:Y().btn,children:"Mint"})},e=V(rt).contract,n=(0,l.oR)().starknetStore,r=(0,s.useState)(""),o=(r[0],r[1]),i=(0,s.useState)(!1),c=i[0],u=i[1],p=(0,_.pm)(),d=(0,et.qY)(),f=d.isOpen,m=d.onOpen,y=d.onClose,h=(s.useRef(),(0,X.useStarknetCall)({contract:e,method:"name",args:[]})),x=h.data,j=(h.loading,h.refresh),C=(0,X.useStarknetCall)({contract:e,method:"symbol",args:[]}),g=C.data,k=(C.loading,C.refresh),S=(0,X.useStarknetCall)({contract:e,method:"totalSupply",args:[]}),w=S.data,A=(S.loading,S.refresh),N=function(t){return(0,tt.decodeShortString)(t.toString("hex"))},E=function(){var t,e=(t=b().mark((function t(){var e,a;return b().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e={contractAddress:rt,entrypoint:"mint",calldata:[n.starknetAddress]},u(!0),m(),t.next=6,B(T,M,n.starknetAddress,n.keyPair,[e],[$]);case 6:return a=t.sent,o(a.transaction_hash),t.next=10,T.waitForTransaction(a.transaction_hash);case 10:console.log(a.transaction_hash),u(!1),y(),p({title:"Success",description:"Minted successfully! Tx:".concat(a.transaction_hash),status:"success",position:"top",duration:2e4,isClosable:!0}),t.next=21;break;case 16:t.prev=16,t.t0=t.catch(0),u(!1),y(),p({title:"Error",description:t.t0.message,status:"error",position:"top",duration:5e3,isClosable:!0});case 21:case"end":return t.stop()}}),t,null,[[0,16]])})),function(){var e=this,n=arguments;return new Promise((function(a,s){var r=t.apply(e,n);function o(t){st(r,a,s,o,i,"next",t)}function i(t){st(r,a,s,o,i,"throw",t)}o(void 0)}))});return function(){return e.apply(this,arguments)}}();return(0,s.useEffect)((function(){j(),k(),A()}),[]),(0,s.useEffect)((function(){A()}),[c]),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("div",{className:Y().section,children:[(0,a.jsx)("h1",{children:"ERC721 NFT"}),(0,a.jsx)("div",{className:Y().content,children:(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("h4",{children:["Contract Address:\xa0",(0,a.jsx)("br",{}),(0,a.jsx)(D(),{href:"https://goerli.voyager.online/contract/".concat(rt),children:(0,a.jsx)("a",{target:"_blank",rel:"noreferrer",children:(0,a.jsx)("span",{className:Y().address,children:rt})})})]}),(0,a.jsxs)("h4",{children:["NFT Name:\xa0",x?(0,a.jsx)("span",{children:N(x[0])}):(0,a.jsx)(nt.Od,{height:"20px"})]}),(0,a.jsxs)("h4",{children:["NFT Symbol:\xa0",g?(0,a.jsx)("span",{children:N(g[0])}):(0,a.jsx)(nt.Od,{height:"20px"})]}),(0,a.jsxs)("h4",{children:["Total Supply:\xa0",w?(0,a.jsx)("span",{children:(0,Q.uint256ToBN)(w[0]).toString()}):(0,a.jsx)(nt.Od,{height:"20px"})]}),(0,a.jsxs)("h4",{children:["Mint Price:\xa0",(0,a.jsx)("span",{children:"0 ETH"})]})]})}),(0,a.jsx)(t,{})]}),(0,a.jsxs)(at.u_,{isOpen:f,onClose:y,children:[(0,a.jsx)(at.ZA,{}),(0,a.jsxs)(at.hz,{className:Y().modalContent,children:[(0,a.jsx)(at.ol,{}),(0,a.jsxs)(at.fe,{className:Y().modalBody,children:[(0,a.jsx)(v.$,{}),"\xa0 Minting...",(0,a.jsx)("br",{})]})]})]})]})}var it=n(4627),ct=n.n(it),ut=n(2546);function lt(t){return(0,X.useContract)({abi:ut,address:t})}function pt(){var t=lt(U).contract,e=(0,X.useStarknetCall)({contract:t,method:"balanceOf",args:[M]}),n=e.data,r=(e.loading,e.refresh);(0,s.useEffect)((function(){r()}),[]);var o;return(0,a.jsxs)("div",{className:ct().section,children:[(0,a.jsx)("h1",{children:"Pay Master"}),(0,a.jsxs)("div",{className:ct().content,children:[(0,a.jsxs)("h4",{children:["Pay Master Address:\xa0",(0,a.jsx)("br",{}),(0,a.jsx)(D(),{href:"https://goerli.voyager.online/contract/".concat(M),children:(0,a.jsx)("a",{target:"_blank",rel:"noreferrer",children:(0,a.jsx)("span",{className:ct().address,children:M})})})]}),(0,a.jsxs)("h4",{children:["Balance:\xa0",n?(0,a.jsxs)("span",{children:[(o=(0,Q.uint256ToBN)(n[0]),k.formatEther(o.toString())).toString(),"\xa0ETH"]}):(0,a.jsx)(nt.Od,{height:"20px"})]})]})]})}var dt=n(8573),ft=n.n(dt);function mt(){var t=(0,l.oR)().starknetStore.starknetAddress,e=lt(U).contract,n=V("0x014f90fe1c113d1054c5f420ebb3ab0e039c45d896453ed5059f39dca7e46ae0").contract,r=(0,X.useStarknetCall)({contract:e,method:"balanceOf",args:[t]}),o=r.data,i=(r.loading,r.refresh),c=(0,X.useStarknetCall)({contract:n,method:"balanceOf",args:[t]}),u=c.data,p=(c.loading,c.refresh);return(0,s.useEffect)((function(){i(),console.log("ethBalance",o),p()}),[]),(0,a.jsxs)("div",{className:ft().section,children:[(0,a.jsx)("h1",{children:"Profile"}),(0,a.jsxs)("div",{className:ft().content,children:[(0,a.jsxs)("h4",{children:["Address:",(0,a.jsx)("br",{}),(0,a.jsx)(D(),{href:"https://goerli.voyager.online/contract/".concat(t),children:(0,a.jsx)("a",{target:"_blank",rel:"noreferrer",children:(0,a.jsx)("span",{className:ft().address,children:t})})})]}),(0,a.jsxs)("h4",{children:["Balance:\xa0",o?(0,a.jsxs)("span",{children:[(0,Q.uint256ToBN)(o[0]).toString(),"\xa0ETH"]}):(0,a.jsx)(nt.Od,{height:"20px"})]}),(0,a.jsxs)("h4",{children:["Balance of NFT:\xa0",u?(0,a.jsx)("span",{children:(0,Q.uint256ToBN)(u[0]).toString()}):(0,a.jsx)(nt.Od,{height:"20px"})]})]})]})}var yt=(0,p.Pi)((function(){var t=(0,l.oR)().starknetStore;return t.accountState===l.eD.EnabledZeroGas?(0,a.jsxs)("div",{className:u().cardBox,children:[(0,a.jsx)(pt,{}),(0,a.jsx)(mt,{}),(0,a.jsx)(ot,{})]}):t.accountState===l.eD.ConnetedWithoutStarkKey||t.accountState===l.eD.ConnetedHasStarkKey?(0,a.jsx)(W,{}):(0,a.jsx)(a.Fragment,{})})),ht=function(){var t=(0,r.mA)(),e=(t.address,t.isConnected,(0,s.useState)(!0));e[0],e[1],(0,l.oR)().starknetStore;return(0,a.jsxs)("div",{className:u().section,children:[(0,a.jsx)(i,{}),(0,a.jsx)(yt,{})]})}},3643:function(t,e,n){"use strict";n.d(e,{eD:function(){return a},oR:function(){return u}});var a,s=n(8949),r=n(7294),o=n(4976);!function(t){t[t.Unkown=0]="Unkown",t[t.ConnetedWithoutStarkKey=1]="ConnetedWithoutStarkKey",t[t.ConnetedHasStarkKey=2]="ConnetedHasStarkKey",t[t.EnabledZeroGas=3]="EnabledZeroGas"}(a||(a={}));var i={starknetStore:(0,s.ky)({keyPair:null,starknetAddress:"",setStarknetAddress:function(t,e){console.log("starknetAddress",e),this.starknetAddress=e,(0,o.dq)(t,e)},accountState:a.Unkown,setAccountState:function(t,e,n){console.log("setAccountState",this),!t||e||n?t&&e&&!n?this.accountState=a.ConnetedHasStarkKey:t&&e&&n&&(this.accountState=a.EnabledZeroGas):this.accountState=a.ConnetedWithoutStarkKey}})},c=(0,r.createContext)(i),u=function(){return(0,r.useContext)(c)}},2732:function(t){t.exports={modal:"accountModal_modal__FtSmE",title:"accountModal_title__njZTv",card:"accountModal_card__JJMQa"}},5961:function(t){t.exports={container:"authentication_container__qCZY8",iconBox:"authentication_iconBox__rcCo7",icon:"authentication_icon__1GJKK",btn:"authentication_btn__vH39l",btnEnable:"authentication_btnEnable__OOkZq",btnCreated:"authentication_btnCreated__kz67e",address:"authentication_address__B2Nd1",content:"authentication_content__bQBFm",account:"authentication_account__HvxFq"}},6422:function(t){t.exports={container:"enableZeroGas_container__pJ2tj",iconBox:"enableZeroGas_iconBox__zDwmI",icon:"enableZeroGas_icon__sp72E",btn:"enableZeroGas_btn__LLV1Z",btnDisable:"enableZeroGas_btnDisable__va5qO",content:"enableZeroGas_content__RUgXf"}},1407:function(t){t.exports={section:"mintCard_section___Tpam",content:"mintCard_content__UVWJp",btn:"mintCard_btn__6lJne",btnDisable:"mintCard_btnDisable__pqfa9",address:"mintCard_address__EFdm_",modalContent:"mintCard_modalContent__ZaXW7",modalBody:"mintCard_modalBody__sSBfj"}},4627:function(t){t.exports={section:"payMasterCard_section__eEahw",content:"payMasterCard_content__Zw4N4",address:"payMasterCard_address___mz3f"}},8573:function(t){t.exports={section:"profileCard_section__C2UE7",content:"profileCard_content__VKhpO",address:"profileCard_address__w6WYG"}},1633:function(t){t.exports={section:"Home_section__EaDnq",cardBox:"Home_cardBox__r2uyR"}},2546:function(t){"use strict";t.exports=JSON.parse('[{"members":[{"name":"low","offset":0,"type":"felt"},{"name":"high","offset":1,"type":"felt"}],"name":"Uint256","size":2,"type":"struct"},{"data":[{"name":"from_","type":"felt"},{"name":"to","type":"felt"},{"name":"value","type":"Uint256"}],"keys":[],"name":"Transfer","type":"event"},{"data":[{"name":"owner","type":"felt"},{"name":"spender","type":"felt"},{"name":"value","type":"Uint256"}],"keys":[],"name":"Approval","type":"event"},{"inputs":[],"name":"name","outputs":[{"name":"name","type":"felt"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"name":"symbol","type":"felt"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"name":"totalSupply","type":"Uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"name":"decimals","type":"felt"}],"stateMutability":"view","type":"function"},{"inputs":[{"name":"account","type":"felt"}],"name":"balanceOf","outputs":[{"name":"balance","type":"Uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"name":"owner","type":"felt"},{"name":"spender","type":"felt"}],"name":"allowance","outputs":[{"name":"remaining","type":"Uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"permittedMinter","outputs":[{"name":"minter","type":"felt"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initialized","outputs":[{"name":"res","type":"felt"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"get_version","outputs":[{"name":"version","type":"felt"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"get_identity","outputs":[{"name":"identity","type":"felt"}],"stateMutability":"view","type":"function"},{"inputs":[{"name":"init_vector_len","type":"felt"},{"name":"init_vector","type":"felt*"}],"name":"initialize","outputs":[],"type":"function"},{"inputs":[{"name":"recipient","type":"felt"},{"name":"amount","type":"Uint256"}],"name":"transfer","outputs":[{"name":"success","type":"felt"}],"type":"function"},{"inputs":[{"name":"sender","type":"felt"},{"name":"recipient","type":"felt"},{"name":"amount","type":"Uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"felt"}],"type":"function"},{"inputs":[{"name":"spender","type":"felt"},{"name":"amount","type":"Uint256"}],"name":"approve","outputs":[{"name":"success","type":"felt"}],"type":"function"},{"inputs":[{"name":"spender","type":"felt"},{"name":"added_value","type":"Uint256"}],"name":"increaseAllowance","outputs":[{"name":"success","type":"felt"}],"type":"function"},{"inputs":[{"name":"spender","type":"felt"},{"name":"subtracted_value","type":"Uint256"}],"name":"decreaseAllowance","outputs":[{"name":"success","type":"felt"}],"type":"function"},{"inputs":[{"name":"recipient","type":"felt"},{"name":"amount","type":"Uint256"}],"name":"permissionedMint","outputs":[],"type":"function"},{"inputs":[{"name":"account","type":"felt"},{"name":"amount","type":"Uint256"}],"name":"permissionedBurn","outputs":[],"type":"function"}]')}},function(t){t.O(0,[13,461,152,782,774,888,179],(function(){return e=8312,t(t.s=e);var e}));var e=t.O();_N_E=e}]);