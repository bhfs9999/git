#coding=utf-8
import urllib
import urllib2
import BeautifulSoup

url = "http://www.people.com.cn/rss/politics.xml"
request = urllib2.Request(url)
response = urllib2.urlopen(url)
content = response.read()

soup = BeautifulSoup.BeautifulSoup(content)
all_news = soup.findAll("item")
for news in all_news:
  print "title:", news.title.string
  print "link:", news.contents[4]
  print "date:", news.pubdate.string
  print "author:", news.author.string
  print "description:", news.description.string

# for cd in soup.findAll("item"):
#   print cd
#   if isinstance(cd, BeautifulSoup.CData):
#     print cd
# news = soup.find_all(text = True)
# for anews in news:
#     if isinstance(anews, BeautifulSoup.CData):
#         print 'CData contents: %r' % anews

file = open("news.xml", "wb+")
file.write(content)
