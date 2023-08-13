import $ from 'jquery'
import axios from 'axios'
import { csrfToken } from 'rails-ujs'
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/droppable';

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

document.addEventListener('turbolinks:load', () =>{
    $(function() {
        $('.lesson_box').draggable({
            revert: 'invalid',
            cursor: 'move',
            helper: 'clone'
          });
        
          $('.lesson_box').droppable({
            accept: '.lesson_box',
            drop: function(event, ui) {
              var sourceBox = $(ui.draggable);
              var targetBox = $(this);
              
              // Swap the contents of the source and target boxes
              var sourceContent = sourceBox.html();
              var targetContent = targetBox.html();
              
              sourceBox.html(targetContent);
              targetBox.html(sourceContent);
              
              // Send an Ajax request to update the server with the new order
              var sourceIndex = sourceBox.index();
              var targetIndex = targetBox.index();
              
              // $.ajax({
              //   url: '/update_lesson_order', // Change this to the appropriate route
              //   method: 'POST',
              //   data: { sourceIndex: sourceIndex, targetIndex: targetIndex },
              //   success: function(response) {
              //     // Handle success if needed
              //   },
              //   error: function(error) {
              //     // Handle error if needed
              //   }
              // });
            }
          });
    });
});