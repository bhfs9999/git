# -*- coding:UTF-8 -*-
#! /usr/bin/python

from pandas import DataFrame
import pandas as pd
import jieba
import numpy as np

import MySQLdb
import cPickle as pickle
from sqlalchemy import create_engine
dist = {u'青光眼':{u'青光眼',u'原发性青光眼',u'继发性青光眼',u'发育性青光眼'},
		u'泪器病':{u'泪器病',u'泪液排出',u'泪液分泌',u'泪囊炎',u'泪小管炎',u'泪腺炎 ',u'泪腺肿瘤'},
		u'晶状体病':{u'晶状体病',u'白内障',u'晶体异形',u'晶状体脱位'},
		u'结膜病':{u'结膜病',u'结膜炎'},
		u'视网膜病':{u'视网膜病',u'视网膜血管病',u'黄斑疾病',u'视网膜脱离',u'视网膜色素变性',u'色觉障碍'},
		u'眼外伤':{u'眼外伤',u'钝挫伤',u'物理性眼外伤',u'眼球穿通',u'眼内异物',u'眼球外异物',u'酸碱化学'},
		u'巩膜病':{u'巩膜病',u'巩膜炎',u'葡萄肿'},
		u'角膜病':{u'角膜病',u'角膜炎',u'角膜老年环',u'角膜病变',u'角膜变性',u'角膜营养不良',u'角膜先天异常',u'圆锥角膜',u'大角膜',u'小角膜',u'角膜软化症'},
		u'眼睑病':{u'眼睑病',u'上睑下垂',u'眼睑位置',u'眼睑功能异常',u'眼睑先天异常',u'睑裂狭小综合征',u'内眦赘皮',u'眼睑闭合',u'睑外翻',u'双行睫',u'睑内翻',u'倒睫',u'乱睫',u'眼睑缺损',
				u'眼睑炎症',u'睑皮炎',u'睑缘炎',u'睑板腺囊肿',u'睑腺炎'},
		u'屈光系统':{u'屈光系统',u'屈光不正',u'正视化',u'近视',u'远视',u'散光',u'屈光参差',u'老视',u'低视力'},
		u'眼眶病':{u'眼眶病',u'眼眶炎症',u'眶蜂窝织炎',u'眼眶特发性炎性假瘤',u'眼眶血管畸形',u'动静脉瘘',u'眶静脉曲张',u'甲状腺'},
		u'葡萄膜炎':{u'葡萄膜炎',u'强直性脊椎炎',u'小柳原田病',u'Vogt',u'Fuchs综合征',u'Behcet',u'交感性眼炎',u'急性视网膜坏死综合征'},
		u'眼表疾病':{u'眼表疾病',u'干眼症'},
		u'玻璃体病':{u'玻璃体病',u'玻璃体变性',u'玻璃体液化',u'淀粉样变性',u'玻璃体积血',u'玻璃体炎症',u'玻璃体寄生虫病',u'玻璃体移位',u'玻璃体发育性异常',u'玻璃体后脱离',u'飞蚊症',
				 u'玻璃体混浊',u'玻璃体视网膜界面异常',u'增生性玻璃体视网膜病变',u''},
		u'眼部肿瘤':{u'眼部肿瘤',u'眼睑良性肿瘤',u'乳头状瘤',u'色素痣',u'黄色瘤',u'血管瘤',u'皮样囊肿',u'浆细胞瘤',u'细胞癌',u'黑色素瘤',u'睑板腺癌',u'脉络膜转移癌',u'母细胞瘤',
				 u'眼球表面肿瘤',u'眼内肿瘤',u'脂肪瘤',u'角膜皮样瘤',u'泪腺多形性腺瘤',u'淋巴瘤',u'肌肉瘤',u'胶质瘤',u'眼眶肿瘤'},
		u'眼外肌与弱视':{u'眼外肌与弱视',u'隐斜视',u'隐斜',u'恒定性外斜',u'共同性外斜',u'间歇性外斜',u'共同性内斜',u'先天性内斜 ',u'后天性内斜',u'特殊类型斜视',u'分离性垂直偏斜',u'眼球后退综合征 ',
				   u'A-V综合征',u'麻痹性斜视',u'弱视',u'眼球震颤'},
		u'视神经视路病变':{u'视神经视路病变',u'视神经疾病',u'视乳头炎',u'视神经炎 ',u'视神经病变',u'视盘水肿',u'视神经萎缩',u'视盘血管炎',u'视神经肿瘤',u'视盘弧形斑 ',u'视神经发育不良',u'视盘小凹',u'视盘玻璃疣',
					u'视神经缺损',u'牵牛花综合征',u'视神经病变',u'视交叉病变',u'视束病变 ',u'膝状体病变',u'视放射病变',u'枕叶病变'}}

dis_class = [u'青光眼', u'泪器病', u'晶状体病', u'结膜病', u'视网膜病', u'眼外伤', u'巩膜病', u'角膜病', u'眼睑病', u'屈光系统', u'眼眶病', u'葡萄膜炎', u'眼表疾病', u'玻璃体病', u'眼部肿瘤', u'眼外肌与弱视', u'视神经视路病变']


def readData():
	cn = MySQLdb.connect(host='localhost', port=3306, user='root', passwd='mysql123456', db='wanfang', charset='utf8')
	sql = 'select * from ophthalmology_chn;'
	# 使用utf-8编码读取数据库，读进来的数据是unicode
	dframe = pd.read_sql(sql, con=cn)
	cn.close()
	return dframe

def separateData(dframe):
	# 直接定义中文，使用的是utf-8
	#dist = [u'青光眼', u'泪器病', u'晶状体病', u'结膜病', u'视网膜病', u'眼外伤', u'巩膜病', u'角膜病', u'眼睑病', u'屈光系统', u'眼眶病', u'葡萄膜炎', u'眼表疾病', u'玻璃体病', u'眼部肿瘤', u'眼外肌与弱视', u'视神经视路病变']

	jieba.load_userdict("dis_dic.txt")
	dframe['eyedis'] = np.NAN
	print "begin to seperate data"
	for i in range(0, dframe.shape[0] - 1):
		abstract = dframe.loc[i, 'des']
		title = dframe.loc[i, 'title']
		keyword = dframe.loc[i, 'keyword']
		compare_flag = 0.12
		count = {}
		# 标题
		if title is not np.NAN:
			seg_list = jieba.cut(title, cut_all=True)

			for word in seg_list:
				result_word = check_word(word)
				if result_word != "":
					if result_word in count.items():
						count[result_word] += 3
						continue
					else:
						count[word] = 3
		# 关键词
		if keyword is not np.NAN:
			seg_list = jieba.cut(keyword, cut_all=True)
			for word in seg_list:
				result_word = check_word(word)
				if result_word != "":
					if result_word in count.items():
						count[word] += 2
						continue
					else:
						count[word] = 2

		# 摘要
		if abstract is not np.NAN:
			# jieba.cut()函数的结果有空格
			# jieba.cut()函数返回unicode
			seg_list = jieba.cut(abstract, cut_all=True)
			for word in seg_list:
				result_word = check_word(word)
				if result_word != "":
					if result_word in count.items():
						count[word] += 1
						continue
					else:
						count[word] = 1
		if len(count) > 0:
			result = max(zip(count.values(), count.keys()))
			dframe.loc[i, 'eyedis'] = result[1]
			continue
		else:
			dframe.loc[i, 'eyedis'] = "pending"

	judge = [False] * len(dframe)
	for i in range(0, dframe.shape[0] - 1):
		if dframe.loc[i, 'eyedis'] in dis_class:
			judge[i] = True
	trainData = dframe[judge]
	trainData = trainData.reset_index(drop = True)

	judge = [(False if b else True) for b in judge]
	testData = dframe[judge]
	testData = testData.reset_index(drop = True)
	return trainData, testData

def check_word(word):
	#print type(dist)
	for k,v in dist.items():
		if word in v:
			return k
	return ""


def solve_pend():
	fp = file("penddata_strict.pickle", "rb")
	dframe =  pickle.load(fp)
	print len(dframe)
	return 0
	jieba.load_userdict("dis_dic.txt")
	for i in range(0, dframe.shape[0] - 1):
		abstract = dframe.loc[i, 'des']
		title = dframe.loc[i, 'title']
		keyword = dframe.loc[i, 'keyword']
		compare_flag = 0.12

		title_flag = 0
		key_flag = 0
		abstract_flag = 0
		count = {}
		# 标题
		if title is not np.NAN:
			seg_list = jieba.cut(title, cut_all=True)

			for word in seg_list:
				result_word = check_word(word)
				if result_word != "":
					if result_word in count.items():
						count[result_word] += 3
						continue
					else:
						count[word] = 3
		# if len(count) > 0:
		# 	#print count
		# 	result = max(zip(count.values(),count.keys()))
		# 	dframe.loc[i,'eyedis'] = result[1]
		# 	continue

		# 关键词
		if keyword is not np.NAN:
			seg_list = jieba.cut(keyword, cut_all=True)
			for word in seg_list:
				result_word = check_word(word)
				if result_word != "":
					if result_word in count.items():
						count[word] += 2
						continue
					# elif dframe.loc[i, 'eyedis'] == "pending":
					# 	# dframe.loc[i, 'eyedis'] = word
					# 	key_flag = 1
					# 	count[word] = 1
					# 	continue
					else:
						count[word] = 2
			# if len(count) > 0:
			# 	result = max(zip(count.values(), count.keys()))
			# 	dframe.loc[i, 'eyedis'] = result[1]
			# 	continue

		# 摘要
		if abstract is not np.NAN:
			# jieba.cut()函数的结果有空格
			# jieba.cut()函数返回unicode
			seg_list = jieba.cut(abstract, cut_all=True)

			for word in seg_list:
				result_word = check_word(word)
				if result_word != "":
					if result_word in count.items():
						count[word] += 1
						continue
					# elif dframe.loc[i, 'eyedis'] == "pending":
					# 	# dframe.loc[i, 'eyedis'] = word
					# 	abstract_flag = 1
					# 	count[word] = 1
					# 	continue
					else:
						count[word] = 1
		if len(count) > 0:
			result = max(zip(count.values(), count.keys()))
			dframe.loc[i, 'eyedis'] = result[1]
			continue
		else:
			dframe.loc[i, 'eyedis'] = "pending"
	engine = create_engine("mysql+mysqldb://root:mysql123456@localhost:3306/wanfang", echo=True)
	dframe.to_sql(name="ophthalmology_pend_test", con=engine, chunksize=100)

if __name__ == '__main__':
	#solve_pend()
	data= readData()
	traindata,testdata = separateData(data)
	print "begin to store data"
	engine = create_engine("mysql+mysqldb://root:mysql123456@localhost:3306/wanfang", echo=True)
	traindata.to_sql(name="ophthalmology_train2", con=engine, chunksize=100)
	testdata.to_sql(name="ophthalmology_test2", con=engine, chunksize=100)
	# fp = file("testdata_strict.pickle", "wb")
	# pickle.dump(testdata, fp, True)
	#fp = file("penddata_strict.pickle", "wb")
	#pickle.dump(penddata, fp, True)
	# fp = file("traindata_strict.pickle", "wb")
	# pickle.dump(traindata, fp, True)
