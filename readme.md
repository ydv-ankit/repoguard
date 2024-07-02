# Repoguard: Streamlining GitHub management from command line

### Available commands:
-   `repoguard configure` - configure the tool & add github token
-   `repoguard remove` - remove github token
-   `repoguard create` - create a new repository
-   `repoguard delete -r <repo-name>` - delete a repository
-   `repoguard info -a -u <username>` - list all public repositories of user
-   `repoguard info -r <repo-name> -u <username>` - get information about a repository

### Binary Releases available for:
-   Windows
-   Linux
-   MacOS

### Installation

- #### With Binary: [Download here](https://github.com/ydv-ankit/repoguard/releases)


- #### with source code:

  1. using npm:
      ```bash
      npm install -g repoguard
      ```

  2. using source code:

      clone the repository
      ```bash
        git clone https://github.com/ydv-ankit/repoguard.git
      ```
      navigate to the directory
      ```bash
        cd repoguard
      ```
      install the dependencies
      ```bash
        npm install
      ```
      link the package
      ```bash
        npm link
      ```
      now you can use `repoguard` command from anywhere in your terminal

---
### Want a GO version of this tool? [checkout here](https://github.com/harisheoran/repoguard)

### Contributions are welcome! 🚀