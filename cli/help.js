var f = function() {
    this.description = 'help commend'
    this.action = function() {
        return function() {
            process.stdout.write('\n' + [
                'Usage: leju [Command] [Options]',
                '',
                'Command:',
                '',
                '  babel                es6to5',
                '    <file>             filename',
                '  server               establish local server',
                '    <number>           port',
                '  folder               establish folder',
                '  cinit                commonjs browserify',
                '    <file>             filename',
                '  uglify               compass javascript',
                '    -b                 beautiful',
                '  ci                   auto online update',
                '    <file>             filename',
                '    <folder>           folder name',
                '  cdn                  local proxy',
                '     -l                local',
                '     -t                text',
                '     -o                online'
            ].join('\n') + '\n')
        }
    }
}
exports._export = f