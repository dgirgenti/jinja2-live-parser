$(document).ready(function(){
    $('#clear').click(function() {
        $('#template,#render,#values').val('');
        $('#jinja,#nunjucks').html('');
    });

    $('#convert').click(function(e) {
        const showWhitespace = $('input[name="showwhitespaces"]').is(':checked') ? 1 : 0;
        const useDummyValues = $('input[name="dummyvalues"]').is(':checked') ? 1 : 0;
        const input_type = $('input[name="input_type"]:checked').val();
        const templateVal = $('#template').val();
        const varsVal = $('#values').val();

        e.preventDefault();

        // Push the input to the Jinja2 api (Python)
        $.post('/convert', {
            template: templateVal,
            values: varsVal,
            input_type: input_type,
            showwhitespaces: showWhitespace,
            dummyvalues: useDummyValues
        }).done(function(response) {
            response = response.replace(/•/g, '<span class="whitespace">•</span>');
            $('#jinja').html(response);
        });


        // Nunjucks
        nunjucks.installJinjaCompat();
        const nunjucksEnv = nunjucks.configure({ autoescape: true });

        nunjucksEnv.addGlobal('leetify', (str) => {
            return str.replace(/a/g,'4').replace(/e/g,'3').replace(/i/g,'1').replace(/o/g,'0').replace(/u/g,'^');
        });

        nunjucksEnv.addGlobal('_get', function _get (path, args) {
            const defaultValue = _.get(args, 'default', '') || args || '';
            return _.get(this.ctx, path, defaultValue);
        });

        let nunjucksStr = nunjucksEnv.renderString(templateVal, JSON.parse(varsVal)).replace(/\n/g, '<br/>');
        if (showWhitespace) {
            nunjucksStr = nunjucksStr.replace(/ /g, '<span class="whitespace">•</span>');
        }
        $('#nunjucks').html(nunjucksStr);
    });
});
