import $ from 'jquery'
import html2canvas from 'html2canvas'

document.addEventListener('turbolinks:load', () =>{
    const schoolClassId = gon.school_class_id;
    $(".print_btn").on('click', (event) =>{
        const startOfWeek = $(event.currentTarget).data('startOfWeek');
        const pdfPage = window.open(`/school_classes/${schoolClassId}.pdf?start_of_week=${startOfWeek}`)
        pdfPage.onload = function () {
            pdfPage.print();
        };
    })

    $(".image_btn").on('click', (event) =>{
        const startOfWeek = $(event.currentTarget).data('startOfWeek');
        const endOfWeek = $(event.currentTarget).data('endOfWeek');
        const className = $(event.currentTarget).data('className');
        html2canvas(document.querySelector('.class_weekly')).then(canvas =>{
            const link = document.createElement('a')
            link.href = canvas.toDataURL()
            link.download = `${className}時間割(${startOfWeek}〜${endOfWeek}).png`
            link.click()
        })
    });
});