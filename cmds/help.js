const menus = {
    main: `
      lzconfig [command] <options>
  
      generate .............. generate configuration based on config
      version ............ show package version
      help ............... show help menu for a command`,

    generate: `
      lzconfig generate <options>
  
      --path, -p ..... the location to config file (mandatory)
      --app, -a ..... the app name to config file (mandatory)
      --env, -e ..... the env name to config file (mandatory)
      --output, -o ..... output path (optional)`,
}

module.exports = (args, log) => {
    const subCmd = args._[0] === 'help'
        ? args._[1]
        : args._[0]

    log.info(menus[subCmd] || menus.main)
    log.info('\r');
}