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

UI.Notify = function (element) {
        
    var button = null;
    var span = null;
    var p = null;
    var i = null;
    var notify = null;
    var HtmlElement = element;

    

    this.init = function () {
        notify = this;
        this.close();
        button = document.createElement('button');
        button.className = 'close';
        button.type = 'button';
        button.onclick = function () { notify.close(); }
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











































var author = 'Yonatan Alexis Quintero Rodriguez';
var version = '0.1';