% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/documentation.R, R/html_builder.R
\name{add_texts}
\alias{add_texts}
\alias{add_text}
\alias{add_title}
\title{Helper functions to add element to HTML}
\usage{
add_text(...)

add_title(my_html, ..., size = 3, into = "body")
}
\arguments{
\item{...}{Element contents and attributes; attrbutes must be named. See references for 
HTML5-tags guides.}

\item{my_html}{An HTML object, e.g. output from create_html().}

\item{size}{integer from 1 to 6; size of the title. 1 is the largest.}

\item{into}{Characters; an identifier. It could be a tag name, an element id or a class name.}
}
\description{
There are two functions in this class: \code{add_text} and \code{add_title}.
\code{add_text} is <span> tag and \code{add_title} is a <hX> tag, X from 1 to 6.
}
\examples{
\dontrun{
create_html() \%>\% 
  add_title("This is a title") \%>\% 
  add_title("This is a subtitle", size = 4) \%>\% 
  add_text("Some description of your website here") \%>\% 
  start_app()
}
}
\references{
Quick guide to HTML tags \url{https://www.nobledesktop.com/html-quick-guide/}
}
