// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

// require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")
require('jquery');
require("jquery-ui")
require('jquery-ui/ui/widgets/draggable')

import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()
// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

import $ from 'jquery';
import axios from 'axios';

document.addEventListener('turbolinks:load', () =>{
    $(".default_menu_btn").on('click', (event) =>{
        $('.default_menu_btn').addClass('hidden');
        $('.header').css('display', 'block');
        $('.main_container').css('margin-left', '260px');
        $('.header_close_btn').removeClass('hidden');
    });

    $('.header_close_btn').on('click', (event) =>{
        $('.default_menu_btn').removeClass('hidden');
        $('.header').css('display', 'none');
        $('.main_container').css('margin-left', '0px');
        $('.header_close_btn').addClass('hidden')
    });

    $(".header_edit_btn").on('click', ()=> {
        $(".header_display_name").addClass("hidden")
        $(".header_edit_btn").addClass("hidden")
        $(".header_edit_box").removeClass("hidden")
    })

    // 要素を取得
    const flash = document.getElementById('flash');
    // スライドアウトする関数
    function slideOut() {
    // 下から上へのアニメーションを追加するためのCSSを適用
    flash.style.transition = 'transform 0.5s ease-out';
    flash.style.transform = 'translateY(-100%)'; // 下から上へ移動する
    }
    // 数秒後にスライドアウト関数を実行
    if( flash !== null){
        setTimeout(slideOut, 2000); // 3000ミリ秒 = 3秒後
    }


    $(".school_class_setting_btn").each(function(index, element){
        $(`#edit_btn${index}`).on('click', (event) =>{
            $(`#edit${index}`).removeClass('hidden');
        });

        // ドキュメント全体のクリックイベントを設定し、#edit_btn${index} の外側をクリックしたときに非表示にする
        $(document).on('click', (event) => {
            if(!$(event.target).closest(`#edit_btn${index}`).length) {
                $(`#edit${index}`).addClass('hidden');
            }
        });

        $(`#follow_edit_btn${index}`).on('click', (event) =>{
            $(`#follow_edit${index}`).removeClass('hidden');
        });

        $(document).on('click', (event) => {
            if(!$(event.target).closest(`#follow_edit_btn${index}`).length) {
                $(`#follow_edit${index}`).addClass('hidden');
            }
        });
    });
});