#coding=utf-8
import urllib
import urllib2

import BeautifulSoup

import MySQLdb

def connDb():
    db = MySQLdb.connect("localhost", "root", "1234", "news_site")
    return db


url = "http://www.people.com.cn/rss/politics.xml"
request = urllib2.Request(url)
response = urllib2.urlopen(url)
content = response.read()

db = connDb()
db.set_character_set('utf8')
cursor = db.cursor()

soup = BeautifulSoup.BeautifulSoup(content)
all_news = soup.findAll("item")
for news in all_news:
    title = news.title.string
    link = news.contents[4]
    date = news.pubdate.string
    author = news.author.string
    description = news.description.string
    if len(description) > 5000:
        continue
    origin = u'人民网'

    sql = u"insert into news_site.news (title, link, date, author, description, origin) values('" + \
            title + "','" + link + "','" + date + "','" + author + "','" + description + "','" + origin + "');"
    try:
        cursor.execute(sql)
        db.commit()
    except:
        db.rollback()
        print "Insert failed, pass!"
    else:
        print "Insert success! Title: " + title

db.close()

# file = open("news.xml", "wb+")
# file.write(content)
