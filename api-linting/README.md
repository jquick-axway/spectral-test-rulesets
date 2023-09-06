# API Linting

Amplify uses [Spectral](https://docs.stoplight.io/docs/spectral/) to lint Web APIs. This feature is only available
to organizations having an
[API Compliance](https://docs.axway.com/bundle/amplify-central/page/docs/manage_compliance/index.html)
entitlement. This "Amplify Extension" repository allows you to use custom rulesets and JavaScript functions
that can be referenced in Amplify.

## Amplify Limitations

By default, Amplify's "Compliance Profile" UI and CLI applies limitations on what kind of custom linting rulesets
you an submit. These limitations are:

- Cannot submit JavaScript rulesets or functions.
  * Rulesets are limited to JSON and YAML files.
- Amplify ruleset cannot "extend" another Amplify ruleset.
- Amplify ruleset cannot reference another file via an "unapproved" URL.
  * For security reasons, Amplify blocks all URLs except for what's on our "approved" URL list.
  * Raw file access to this "Amplify Extension" repository's main branch is on the "approved" list.

This "Amplify Extension" repository allows you to bypass these limitations.

## Amplify Extension Restrictions

- Ruleset files are not allowed to reference other rulesets via "unapproved" URLs.
  * This repository's URL is on Amplify's "approved" list.
- JavaScript files are not allowed to access the network or filesystem.
- JavaScript files cannot be obfuscated.
- JavaScript can only import/require-in modules that are available to the Spectral CLI.
- JavaScript files are not allowed to bundle/rollup dependencies.

## Custom Rulesets and Functions

Your custom Spectral ruleset files should be in this folder. Rulesets can be written in JSON, YAML, and JavaScript
file formats. Your custom Spectral JavaScript linting functions should be added to the [./functions](./functions/)
subdirectory. See the [Spectral](https://docs.stoplight.io/docs/spectral/) documentation on how to write
"Custom Functions".

You can test your custom rulesets and files in this folder via the Spectral CLI. For example...
```sh
spectral lint --ruleset example.yaml ./tests/openapi-v2.yaml
```

## Access Custom Ruleset in Amplify

To use a custom ruleset in this repository in Amplify, you'll need to create a separate ruleset file
which "links" to it as shown below. You'll need to replae `<your-repo-name>` with the name of this repository
and the `example.yaml` file name with the one you want to use in Amplify.
_(Tip: In GitHub, click on a file and then click the "Raw" button to get the raw file URL to use.)_

```yaml
extends: ["https://raw.githubusercontent.com/Axway/<your-repo-name>/main/api-linting/example.yaml"]
```

Next, you'll add the above ruleset file to Amplify in the UI as follows.

1. Log in as an Administrator on: https://platform.axway.com
2. Click on "Central".
3. Go to the "Topology/Compliance Profiles" webpage.
4. Click on the "Upload Ruleset" button.
5. Drag and drop the above "link" ruleset file into the "Upload File" box.
6. Finish entering the rest of the configuration in the UI and click the "Upload" button.
7. Edit an "Environment" and select the ruleset you just set up.

Your new Amplify ruleset which "links" to the custom ruleset in this repository can now be used in Amplify.
Since it links via a URL, you don't have to update anything in Amplify when you make changes in this repository.
