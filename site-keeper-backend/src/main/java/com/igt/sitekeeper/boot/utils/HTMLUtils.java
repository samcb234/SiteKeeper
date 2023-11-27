package com.igt.sitekeeper.boot.utils;

import freemarker.cache.ClassTemplateLoader;
import freemarker.cache.MultiTemplateLoader;
import freemarker.cache.TemplateLoader;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateExceptionHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.StringWriter;
import java.util.Map;
import java.util.TimeZone;

public class HTMLUtils {

    private Configuration cfg;

    public HTMLUtils() {

        this.cfg = new Configuration(Configuration.VERSION_2_3_32);

        // Specify the source where the template files come from. Here I set a
        // plain directory for it, but non-file-system sources are possible too:
        try{
            ClassTemplateLoader ctl = new ClassTemplateLoader(getClass(), "/HTMLTemplates/");
            MultiTemplateLoader mtl = new MultiTemplateLoader(new TemplateLoader[] { ctl });
            cfg.setTemplateLoader(mtl);
        }catch (Exception e){
            System.out.println("Error loading template!");
            e.printStackTrace();
        }

        // From here we will set the settings recommended for new projects. These
        // aren't the defaults for backward compatibilty.

        // Set the preferred charset template files are stored in. UTF-8 is
        // a good choice in most applications:
        cfg.setDefaultEncoding("UTF-8");

        // Sets how errors will appear.
        // During web page *development* TemplateExceptionHandler.HTML_DEBUG_HANDLER is better.
        cfg.setTemplateExceptionHandler(TemplateExceptionHandler.RETHROW_HANDLER);

        // Don't log exceptions inside FreeMarker that it will thrown at you anyway:
        cfg.setLogTemplateExceptions(false);

        // Wrap unchecked exceptions thrown during template processing into TemplateException-s:
        cfg.setWrapUncheckedExceptions(true);

        // Do not fall back to higher scopes when reading a null loop variable:
        cfg.setFallbackOnNullLoopVariable(false);

        // To accomodate to how JDBC returns values; see Javadoc!
        cfg.setSQLDateAndTimeTimeZone(TimeZone.getDefault());
    }

    public String getHTML(Map<Object, Object> root, String template){
        Template temp = null;
        try{
            temp = cfg.getTemplate(template);
            StringWriter out = new StringWriter();
            temp.process(root, out);
            return out.toString();
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
