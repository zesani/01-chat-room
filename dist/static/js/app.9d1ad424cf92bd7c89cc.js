webpackJsonp([0],{HSin:function(s,e){},NHnr:function(s,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=t("7+uW"),a={name:"App",data:function(){return{socket:"",users:[],user:"",messages:[]}},mounted:function(){var s=this;this.socket||(this.socket=io("http://localhost:3000")),this.socket.on("user joined",function(e){s.users.push(e)}),""===this.user&&this.$router.push("/"),this.socket.on("login",function(e){s.user=e,s.$router.push("/chat-room")}),this.socket.on("logout",function(){s.user="",s.$router.push("/")}),this.socket.on("new message",function(e){s.messages.push(e)})},methods:{sendMessage:function(s){this.messages.push({username:this.user.username,id:this.user.id,message:s,server:!1}),this.socket.emit("new message",s)}}},i={render:function(){var s=this.$createElement,e=this._self._c||s;return e("div",{attrs:{id:"app"}},[e("section",{staticClass:"section"},[e("div",{staticClass:"container"},[e("div",{staticClass:"columns is-multiline"},[e("router-view",{staticClass:"column is-6 is-offset-3 bg",attrs:{socket:this.socket,messages:this.messages,users:this.users,user:this.user},on:{"send-message":this.sendMessage}})],1)])])])},staticRenderFns:[]};var o=t("VU/8")(a,i,!1,function(s){t("XujL")},null,null).exports,r=t("/ocq"),u={render:function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",{directives:[{name:"show",rawName:"v-show",value:s.right||s.server,expression:"right || server"}],class:s.className},[s._v("\n  "+s._s(s.username)+" say:"),t("br"),s._v(" "),t("div",{staticClass:"box-message"},[t("p",[s._v("\n        "+s._s(s.message)+"\n      ")])])])},staticRenderFns:[]};var c=t("VU/8")({props:["username","message","right","server"],computed:{className:function(){return this.right?"column is-10 is-offset-2 right-message":"column is-10"}}},u,!1,function(s){t("HSin")},"data-v-2a53f9fe",null).exports,l={props:["socket","messages","user"],components:{MessageBox:c},data:function(){return{message:""}},methods:{newMessage:function(){this.$emit("send-message",this.message),this.message=""},disconnect:function(){console.log("logout"),this.socket.emit("disconnect","a")}}},m={render:function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",{staticClass:"columns is-multiline",attrs:{id:"chat-room"}},[t("div",{staticClass:"column is-12",staticStyle:{float:"right","text-align":"right"}},[t("a",{staticClass:"button is-primary is-outlined"},[s._v(s._s(s.user.username))]),s._v(" "),t("a",{staticClass:"button is-info"},[s._v("#"+s._s(s.user.room))]),s._v(" "),t("a",{staticClass:"button is-danger",on:{click:s.disconnect}},[s._v("Logout")])]),s._v(" "),t("div",{staticClass:"column is-12 display"},[t("div",{staticClass:"columns is-multiline"},s._l(s.messages,function(e,n){return t("message-box",{key:n,attrs:{username:e.username,message:e.message,server:e.server,right:s.user.id===e.id&&!e.server}})}))]),s._v(" "),t("div",{staticClass:"column is-12 input-chat"},[t("b-input",{model:{value:s.message,callback:function(e){s.message=e},expression:"message"}}),s._v(" "),t("br"),s._v(" "),t("a",{staticClass:"button is-primary",on:{click:s.newMessage}},[s._v("SEND")])],1)])},staticRenderFns:[]};var v=t("VU/8")(l,m,!1,function(s){t("OxLP")},"data-v-1cf6cbf3",null).exports,d={props:["socket"],components:{MessageBox:c},data:function(){return{username:"",room:"general"}},methods:{addNewuser:function(){this.socket.emit("add new user",this.username,this.room)}}},h={render:function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("div",{staticClass:"columns is-multiline",attrs:{id:"register"}},[t("div",{staticClass:"column is-12 input-username"},[s._v("\n      Select your Room:\n      "),t("b-field",[t("b-radio-button",{attrs:{"native-value":"general"},model:{value:s.room,callback:function(e){s.room=e},expression:"room"}},[s._v("\n              General\n          ")]),s._v(" "),t("b-radio-button",{attrs:{"native-value":"game"},model:{value:s.room,callback:function(e){s.room=e},expression:"room"}},[s._v("\n              Game\n          ")]),s._v(" "),t("b-radio-button",{attrs:{"native-value":"learning"},model:{value:s.room,callback:function(e){s.room=e},expression:"room"}},[s._v("\n              Learning\n          ")])],1),s._v("\n        What your name ?\n        "),t("b-input",{model:{value:s.username,callback:function(e){s.username=e},expression:"username"}}),s._v(" "),t("br"),s._v(" "),t("a",{staticClass:"button is-primary",on:{click:s.addNewuser}},[s._v("OK")])],1)])},staticRenderFns:[]};var g=t("VU/8")(d,h,!1,function(s){t("OOAu")},"data-v-39745b88",null).exports;n.a.use(r.a);var p=new r.a({routes:[{path:"/chat-room",name:"ChatRoom",component:v},{path:"/",name:"Register",component:g}]}),f=t("MMSg"),_=t.n(f);t("doPI");n.a.use(_.a),n.a.config.productionTip=!1,new n.a({el:"#app",router:p,components:{App:o},template:"<App/>"})},OOAu:function(s,e){},OxLP:function(s,e){},XujL:function(s,e){},doPI:function(s,e){}},["NHnr"]);
//# sourceMappingURL=app.9d1ad424cf92bd7c89cc.js.map