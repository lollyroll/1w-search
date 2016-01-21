define(
    'helpers/prepare-templates',
    function() {
        function prepareTpl(tpl) {
            var re = /<tpl[\s\t]+id=\"((?!\")\w+)\"[\s\t]*>(((?!<\/tpl).)*)<\/tpl>/g,
                templateCollection = {};

            tpl.replace(/(\r\n|\n|\r)/gm, "").replace(re, function (matchStr, id, template) {
                templateCollection[id] = template;
            });

            return templateCollection;
        }

        return prepareTpl;
    }
);