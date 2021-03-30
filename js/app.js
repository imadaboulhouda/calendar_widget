(function ($) {
    var nbr_clique = 0;
    var nbr_clique_precedent = 0;

    function refreshByDate(date, period, add = "", realtime = false) {
        console.log("Nbr Clique", nbr_clique);

        var today = date;
        console.log('today is', today)
        if (period == "right") {
            var data = "";
            if(realtime)
            {
                $(".left_controls").css('visibility','hidden');

            }else{

                $(".left_controls").css('visibility','initial');
                today = incDay(today, 1);
                nbr_clique++;
            }


            if (nbr_clique >= 2) {
                alert('Vous n\'avez pas l\'autorisation');
                return;
            }

            nbr_clique_precedent = 0;
            data += createHumainDate(today);
            lastDate = "";
            for (var i = 1; i <= 2; i++) {
                if (!todayPlus5Day) {
                    var todayPlus5Day = incDay(today, 1);
                } else {
                    todayPlus5Day = incDay(todayPlus5Day, 1);
                }




                lastDate = todayPlus5Day;
                data += createHumainDate(todayPlus5Day);
            }
            $(".calendarWidget__items").html(data);
            if (add) {
                var nDate = new Date(lastDate);
                nDate.setDate(lastDate.getDate() - 4);

                $(".left_controls").attr('data-first',nDate);
                $(".left_controls").data('first', nDate);
            }
            $(".right_controls").attr('data-last', lastDate);
        }

        if (period == "left") {
            //hena fén 3andi problem
            

            var data = "";
            if (!today.getDate()) {
                return;
            }



            nbr_clique_precedent++;
            if (nbr_clique_precedent > 1) {
                alert("Vous n'avez pas l'autorisation");
                return;
            }

            if(nbr_clique_precedent == 1)
            {
                $(".left_controls").css('visibility','hidden');
            }else{
                $(".left_controls").css('visibility','initial');
            }
            nbr_clique = 0;

            var newDate = new Date(today);
            newDate.setDate(today.getDate() - 1);
            console.log("Today is ", newDate);









            data += createHumainDate(newDate);
            lastDate = "";
            for (var i = 1; i <= 2; i++) {

                if (!todayPlus5Day) {
                    var todayPlus5Day = incDay(newDate, 1);
                } else {
                    todayPlus5Day = incDay(todayPlus5Day, 1);
                }



                lastDate = todayPlus5Day;

                data += createHumainDate(todayPlus5Day);
            }
            $(".calendarWidget__items").html(data);
            if (add) {
                var nDate = new Date();
                nDate.setDate(lastDate.getDate() - 4);

                $(".left_controls").data('first', nDate.getFullYear() + "-" + nDate.getMonth() + "-" + nDate.getDate());

            }
            $(".right_controls").attr('data-last', lastDate);
        }

    }

    function refreshDate(type = "", leftDate) {
        if (type == "") {
            refreshByDate(new Date(), "right", '', true);
            return;
        }

        if (type == "right") {
            var last = new Date($(".right_controls").attr('data-last'));
            refreshByDate(last, "right", "add");
        } else if (type == "left") {
            var last = new Date(leftDate);



            refreshByDate(last, "left", "yes");
        }



    }
    $(function () {
        refreshDate();

        $(document).on('click', '.element', function () {
            $(".element.active").removeClass('active');
            $(this).addClass('active');
        });

        $(document).on('click', '.right_controls', function (e) {
            e.preventDefault();
            $(".element.active").removeClass('active');
            refreshDate('right');


            return false;
        });


        $(document).on('click', '.left_controls', function (e) {
            e.preventDefault();
            $(".element.active").removeClass('active');

            refreshDate('left', $(this).data('first'));


            return false;
        });

    });
})(jQuery);