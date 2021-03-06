% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/app.R
\name{start_app}
\alias{start_app}
\title{Run an interactive app}
\usage{
start_app(my_html, user_function = identity, server = F, assets_folder,
  host = "localhost", port = 9454, browser = "viewer", quiet = F)
}
\arguments{
\item{my_html}{An HTML object; output from 'create_html'.}

\item{user_function}{R function; the function to process the data from the web interface.}

\item{server}{T or F; whether to enable interaction between JS and R.}

\item{assets_folder}{path of the assets.}

\item{host}{character string; Address to host the app.}

\item{port}{integer; Port to host the app.}

\item{browser}{"browser" (web) or "viewer" (R).}

\item{quiet}{T or F; if T, display is suppressed.}
}
\description{
Run an interactive app
}
