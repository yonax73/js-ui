/*!
 * js-ui.js
 * Copyright 2014 YonaxTics, Inc.
 * Licensed under http://www.apache.org/licenses/LICENSE-2.0
 */




/* ========================================================================
* js-ui.js
* yonax73@gmail.com
* ========================================================================
* Copyright 2014 yonaxTics, Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ======================================================================== */



/*
* ========================================================================
* This project is dedicated at  all my loved ones, in special a my mother and my wife <3.
* ========================================================================
*/




/*
* ========================================================================
* Author  : Yonatan Alexis Quintero Rodriguez
* Version : 0.1
* Date    : 5 Oct 2014
* ========================================================================
*/










/**
 * NameSpace
 */
var UI = {};









/*
* ========================================================================
* UI-Notify
* Author  : Yonatan Alexis Quintero Rodriguez
* Version : 0.1
* Date    : 5 Oct 2014
* ========================================================================
*/

/*
* @param htmlElementId
*/
UI.Notify = function (htmlElementId) {
        
    var button = null;
    var span = null;
    var p = null;
    var i = null;
    var UINotify = null;
    var HtmlElement = document.getElementById(htmlElementId);

    

    this.init = function () {
        UINotify = this;
        this.close();
        button = document.createElement('button');
        button.className = 'close';
        button.type = 'button';
        button.onclick = function () { UINotify.close(); }
        span = document.createElement('span');
        span.textContent = '×';
        button.appendChild(span);
        HtmlElement.appendChild(button);
        p = document.createElement('p');
        p.className = 'text-center';
        i = document.createElement('i');
        p.appendChild(i);
        strong = document.createElement('strong');
        p.appendChild(strong);
        HtmlElement.appendChild(p);
    }

    this.close = function () {
        HtmlElement.className = 'hidden';
    }


    this.success = function (message) {
        i.className = 'fa fa-smile-o fa-lg pull-left';
        HtmlElement.className = 'alert alert-success alert-dismissible';
        strong.textContent = message;
    }


    this.info = function (message) {
        i.className = 'fa fa-info fa-lg pull-left';
        HtmlElement.className = 'alert alert-info alert-dismissible';
        strong.textContent = message;
    }


    this.warning = function (message) {
        i.className = 'fa fa-exclamation-triangle fa-lg pull-left';
        HtmlElement.className = 'alert alert-warning alert-dismissible';
        strong.textContent = message;
    }


    this.danger = function (message) {
        i.className = 'fa fa-frown-o fa-lg pull-left';
        HtmlElement.className = 'alert alert-danger alert-dismissible';
        strong.textContent = message;
    }


    this.wait = function (message) {
        i.className = 'fa fa-circle-o-notch fa-spin fa-lg pull-left';
        HtmlElement.className = 'alert alert-info alert-dismissible';
        strong.textContent = message;
    }

    this.init();
   
}









/*
* ========================================================================
* UI-SELECT
* Author  : Yonatan Alexis Quintero Rodriguez
* Version : 0.1
* Date    : 6 Oct 2014
* ========================================================================
*/
/*
* @param htmlElementId
* @param items
*/
UI.Select = function(htmlElementId,items){        
         
         var items= items;   
         var span= null;    
         var input= null;
         var inputHidden= null;
         var i= null;     
         var ul= null;
         var oldItemLi= null;
         var currentItemLi= null;     
         var disabled= false;
         var UISelect = null;
         var HtmlElement = document.getElementById(htmlElementId);

        this.init = function(option){   
            UISelect = this;  
            HtmlElement.classList.add('select');
            HtmlElement.classList.add('background');
            this.create();
            this.fill();
            if(option !== undefined){
                this.selectItem(option);            
            }       
        }   
        
        this.create =function(){            
            span =  document.createElement('span');
            input = document.createElement('input');         
            ul=  document.createElement('ul');  
            i = document.createElement('i');                 
            input.type = 'text';     
            input.readOnly  = true;      
            input.className = 'form-control'    
            i.className = 'fa fa-chevron-circle-down';       
            input.onchange =function(){return true;}    
            span.appendChild(input);
            span.appendChild(i);
            
            span.onclick = function(){               
                UISelect.toggle();
                currentItemLi.focus();
             }       
             span.onkeydown = function checkKey(e) {
                 e = e || window.event;
                 if (e.keyCode === 9) {
                      e.preventDefault();
                      UISelect.toggle();
                      currentItemLi.focus();
                 }
             }       
              ul.classList.add('select-list');;
              ul.classList.add('hidden');
              inputHidden = document.createElement('input'); 
              HtmlElement.appendChild( inputHidden);    
              inputHidden.type ='hidden';
             if( HtmlElement.dataset.name!==undefined &&  HtmlElement.dataset.name!==null){           
                inputHidden.name =  HtmlElement.dataset.name;           
             }       
              HtmlElement.appendChild( span);
              HtmlElement.appendChild( ul);             
            
        }        
        
        this.fill = function(){            
            var n =  items.length;      
            for (var i = 0; i < n; i++) {           
                  var item =  items[i];
                  var li = document.createElement('li');                
                  li.textContent= item.value;             
                  li.tabIndex = i;
                  li.dataset.option = item.option;                  
                  li.onclick = function(){                      
                      UISelect.changeValue(this);                 
                 }
                 li.onkeydown = function checkKey(e) {
                     e = e || window.event;
                     if (e.keyCode === 13) {
                          e.preventDefault();
                          UISelect.changeValue(this);
                     }
                 }            
                   ul.appendChild(li);          
            }       
        }        
        
        this.selectItem = function(option){            
              var itemsLi =  ul.getElementsByTagName('li');
              var n = itemsLi.length;                       
              if(n > 0){             
                  var flag = true;
                  var i = 0;    
                  do{                 
                      var item = itemsLi[i++];            
                      if(item.dataset.option == option){                      
                           currentItemLi = item;
                          flag = false;                   
                      }               
                  }while(flag && i < n);              
              }              
              input.value =   currentItemLi.textContent;             
              input.dataset.option =  currentItemLi.dataset.option;
              inputHidden.value=  currentItemLi.dataset.option;
              currentItemLi.focus();
              currentItemLi.classList.add('selected');
        }        
        
        this.toggle = function(){        
             if(!disabled){
                 ul.classList.toggle('hidden');
            }    
       }

       this.changeValue = function(li){
           oldItemLi =  currentItemLi;
           currentItemLi = li;
           input.value = li.textContent;                  
           input.dataset.option = li.dataset.option;
           inputHidden.value= li.dataset.option;
           input.onchange();    
           this.toggle();    
           li.classList.add('selected'); 
           oldItemLi.classList.remove('selected');  
       }
        
       this.addItem = function(option,value){
             var li = document.createElement('li');             
              li.textContent= value;              
              li.tabIndex =   items.length+1;
              li.dataset.option = option;
              li.onclick = function(){                      
                  UISelect.changeValue(this);                 
             }
             li.onkeydown = function checkKey(e) {
                 e = e || window.event;
                 if (e.keyCode === 13) {
                      e.preventDefault();
                      UISelect.changeValue(this);   
                 }
             }            
               ul.appendChild(li);          
        }
        
       this.getItem = function(){           
           return {value:input.value, option:input.dataset.option};
       } 

       
       this.getValue = function(){           
           return input.value;
       }
       
       
       this.getOption = function(){           
           return  input.dataset.option;
       } 
        
       this.setDisabled = function(_disabled){
            disabled = _disabled;           
           if( disabled){
                HtmlElement.classList.remove('background');     
                HtmlElement.classList.add('disabled');  
           }else {
                HtmlElement.classList.remove('disabled');           
                HtmlElement.classList.add('background');    
           }
       }

       this.onchange = function(callback){        
            input.onchange = callback;
       };
        
    }









/*
* ========================================================================
* UI-NAVBAR
* Author  : Yonatan Alexis Quintero Rodriguez
* Version : 0.1
* Date    : 6 Oct 2014
* ========================================================================
*/
/*
* @param htmlElementId
* @param link
* @param links
*/
UI.NavBar = function(htmlElementId,link,links){
         var items= items;   
         var tittle = tittle;
         var container= document.createElement('div');
         var header = document.createElement('div');
         var button = document.createElement('button');   
         var a = document.createElement('a');
         var collapse = document.createElement('div');
         var ul = document.createElement('ul');         
         var UINav = this;
         var HtmlElement = document.getElementById(htmlElementId);

         button.classList.add('navbar-toggle');
         button.classList.add('collapsed');
         var span = document.createElement('span');
         span.classList.add('sr-only');
         span.textContent = 'Toggle navigation';
         button.appendChild(span);
         for (var i = 3 ; i > 0; i--) {
             var span = document.createElement('span');
             span.classList.add('icon-bar');
             button.appendChild(span);
         };
         a.classList.add('navbar-brand');
         a.href = link.href;
         a.textContent = link.text;
         header.classList.add('navbar-header');
         header.appendChild(button);
         header.appendChild(a);
         ul.classList.add('nav');
         ul.classList.add('navbar-nav');
         var n = links.length;
         for (var i = 0; i < 0; i++) {
            var link = links[i];
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = link.href;
            a.textContent = link.text;
            if(link.active){
               li.classList.add('active');
            }
            li.appendChild(a);
            ul.appendChild(li);
         };
         collapse.classList.add('collapse');
         collapse.classList.add('navbar-collapse');
         container.classList.add('container');
         container.appendChild(header);
         container.appendChild(collapse);
         
}









/*
* ========================================================================
* UI-Utils
* Author  : Yonatan Alexis Quintero Rodriguez
* Version : 0.1
* Date    : 6 Oct 2014
* ========================================================================
*/
UI.ReloadCSS = function (htmlElementId,href) {
     var queryString = '?reload=' + new Date().getTime();
    var style = document.getElementById(htmlElementId);
    style.href = href.replace(/\?.*|$/, queryString);
}



var author = 'Yonatan Alexis Quintero Rodriguez';
var version = '0.1';