import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import {join} from 'path';
import {BOOTSTRAP_MODULE, APP_SRC, APP_DEST, TOOLS_DIR} from '../../config';
import {makeTsProject} from '../../utils';
import {ViewBroker} from '../../src/frameworks/app.framework/core/services/view-broker';
const plugins = <any>gulpLoadPlugins();

export = () => {
  let tsProject = makeTsProject();
  let src = [
    'typings/browser.d.ts',
    TOOLS_DIR + '/manual_typings/**/*.d.ts',
    join(APP_SRC, '**/*.ts'),
    '!' + join(APP_SRC, '**/*.e2e.ts'),
    '!' + join(APP_SRC, `${BOOTSTRAP_MODULE}.ts`)
  ];
  let result = gulp.src(src)
    .pipe(plugins.plumber())
    .pipe(plugins.inlineNg2Template({base: APP_SRC, useRelativePaths: true, templateFunction: ViewBroker.TEMPLATE_URL }))
    .pipe(plugins.typescript(tsProject));

  return result.js
    .pipe(gulp.dest(APP_DEST));
}
