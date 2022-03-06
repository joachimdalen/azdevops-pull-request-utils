If using classic pipelines and you get the error:

> TF400813: The user '' is not authorized to access this resource.

Ensure `Allow scripts to access the OAuth token` is checked under options. See the [docs](https://docs.microsoft.com/en-us/azure/devops/pipelines/build/options?view=azure-devops#allow-scripts-to-access-the-oauth-token) for more info.
