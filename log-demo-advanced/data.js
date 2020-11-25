var myLogViewer;

function initData() {
   myLogViewer = new LogViewer('scrollWrapper');
}

function getTimeStamp() {
   date = new Date();
   return date.getFullYear() + "." + (date.getMonth()+1) + "." + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "," + date.getMilliseconds();
}

function getRandomSeverity() {
   index = Math.floor((Math.random() * logLevels.length));
   return logLevels[index];
}

function getRandomLogRecord() {
   index = Math.floor((Math.random() * logLines.length));
   return logLines[index];
}

function appendRandomLog() {
   severity = getRandomSeverity();
   myLogViewer.appendLogRecord(severity, { 'date': getTimeStamp(), 'severity': severity, 'logText': getRandomLogRecord() });
}

function scrollLogToggle() {
   myLogViewer.autoScrollToggle();
   if (myLogViewer.isAutoScrollEnabled()) {
      document.getElementById("pauseCtrl").innerHTML ="||";
   } else {
      document.getElementById("pauseCtrl").innerHTML =">";
   }
}

function filterLines() {
   severeEnabled = !document.getElementById("severeChk").checked;
   myLogViewer.setLinesVisible('severe', severeEnabled);
   infoEnabled = !document.getElementById("infoChk").checked;
   myLogViewer.setLinesVisible('info', infoEnabled);
}


/**
 * DATA
 **/

logLevels = ['DETAIL', 'DEBUG', 'INFO', 'SEVERE'];

logLines = [
   '2020-11-16 21:01:35.090  INFO 40849 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port(s): 8080 (http)',
   '2020-11-16 21:01:35.099  INFO 40849 --- [           main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]',
   '2020-11-16 21:01:35.099  INFO 40849 --- [           main] org.apache.catalina.core.StandardEngine  : Starting Servlet engine: [Apache Tomcat/9.0.38]',
   '2020-11-16 21:01:35.157  INFO 40849 --- [           main] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext',
   '2020-11-16 21:01:35.157  INFO 40849 --- [           main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 1137 ms',
   '2020-11-16 21:01:35.286  INFO 40849 --- [           main] o.m.i.server.config.ModelConfig          : #CONFIG: initializing Bouncy Castle Provider (BCP) ...',
   '2020-11-16 21:01:35.420  INFO 40849 --- [           main] o.m.i.server.config.ModelConfig          : #CONFIG: BCP initialized.',
   '2020-11-16 21:01:35.421  INFO 40849 --- [           main] o.m.i.server.config.ModelConfig          : #CONFIG: default admin password initialized=true',
   '2020-11-16 21:01:35.422  INFO 40849 --- [           main] o.m.i.server.config.ModelConfig          : #CONFIG: default admin client secret initialized=true',
   '2020-11-16 21:01:35.422  INFO 40849 --- [           main] o.m.i.server.config.ModelConfig          : #CONFIG: default admin email=admin@email.com',
   '2020-11-16 21:01:35.422  INFO 40849 --- [           main] o.m.i.server.config.ModelConfig          : #CONFIG: admin organization/project iam-admins/iam-admins',
   '2020-11-16 21:01:35.422  INFO 40849 --- [           main] o.m.i.server.config.ModelConfig          : #CONFIG: persistence=in-memory',
   '2020-11-16 21:01:35.442  INFO 40849 --- [           main] o.m.i.server.config.ModelConfig          : #CONFIG: default ModelWrapper created',
   '2020-11-16 21:01:35.450  INFO 40849 --- [           main] o.m.i.core.model.utils.ModelUtils        : #MODEL: Initializing default model id=default-model name= ...',
   '2020-11-16 21:01:35.450  INFO 40849 --- [           main] o.m.i.core.model.utils.ModelUtils        : #MODEL: Default organizationId=iam-admins, projectId=iam-admins',
   '2020-11-16 21:01:35.450  INFO 40849 --- [           main] o.m.i.core.model.utils.ModelUtils        : #MODEL:    Default admin userId=admin',
   '2020-11-16 21:01:35.450  INFO 40849 --- [           main] o.m.i.core.model.utils.ModelUtils        : #MODEL:    Default client credentials clientId=admin-client clientSecret=top-secret',
   '2020-11-16 21:01:36.228  INFO 40849 --- [           main] o.m.i.s.c.AuthorizationCodeCacheConfig   : #CONFIG iam-service.authorization-code-cache.duration: 10',
   '2020-11-16 21:01:36.228  INFO 40849 --- [           main] o.m.i.s.c.AuthorizationCodeCacheConfig   : #CONFIG iam-service.authorization-code-cache.timeunit: MINUTES',
   '2020-11-16 21:01:36.372  INFO 40849 --- [           main] o.m.i.s.config.CacheSchedulerConfig      : #CONFIG iam-service.cache-cleanup-interval.duration: 1',
   '2020-11-16 21:01:36.372  INFO 40849 --- [           main] o.m.i.s.config.CacheSchedulerConfig      : #CONFIG iam-service.cache-cleanup-interval.timeunit: MINUTES',
   '2020-11-16 21:01:36.373  INFO 40849 --- [           main] o.m.i.c.s.i.c.CacheCleanupSchedulerImpl  : starting cache cleanup scheduler ...',
]

