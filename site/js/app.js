var app = app || {};

$(function(){
    new app.LibraryView();
    $('#releaseDate').datepicker();
    $('#viewBooks').dataTable({
        aoColumnDefs: [
            {
                bSearchable: false,
                aTargets: ['no-search']
            }
        ],
        bProcessing: true,
        bServerSide: true,
        oLanguage: {
            oPaginate: {
                sNext: 'Next &gt;',
                sPrevious: '&lt; Previous'
            }
        },
        sPaginationType: 'two_button',
        sAjaxSource: '/api/books'
    });
});