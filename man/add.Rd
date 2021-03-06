% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/html.R
\docType{data}
\name{add}
\alias{add}
\title{A family of functions for adding HTML 5 elements.}
\format{\code{add} is a list / family of functions for inserting html tags into a html document.}
\usage{
add
}
\arguments{
\item{...}{Element contents and attributes; attrbutes must be named. See references for 
HTML5-tags guides.}
}
\description{
The \code{add} environment wraps around the \code{htmltools::tags} environments, 
and it contains functions for all valid HTML5 tags.
}
\details{
Every html-tag function in \code{add} takes two named arguments \code{html} and \code{into}.  

\code{html} is an HTML object, e.g. output from create_html().  

\code{into} is a character string representing an identifier; it could be a tag name, an element id or a class name.
}
\examples{
\dontrun{
create_html() \%>\% 
  add$h2(into = "body", "A demo webpage") \%>\% 
  add$div(into = "body", "I am a DIV") \%>\% 
  start_app()
}
}
\references{
Quick guide to HTML tags \url{https://www.nobledesktop.com/html-quick-guide/}
}
\keyword{datasets}
