# C基础

## 文本编辑Helloworld

1. 建立helloworld.c的文本文件

    * 键入文本

        ```c
        #inclide<stdio.h>
        int main(void)
        {
            printf("hello world\n");
            return 0;
        }
        ```

2. 保存文本

3. 调出cmd终端

    * 在文件地址栏下键入“cmd”

4. cmd命令生成exe程序

    * 键入dir查看目录
    * 键入gcc helloworld.c -o helloworld.exe
    * 键入helloworld.exe
        * 输出结果

## 常见ide

* 定义：我知道
* 常见的ide
    * window的vs系列
    * clion跨平台的ide
    * 只支持windows的Dev C++
    * Qt Creator跨平台
    * Eclipse不能跨平台
* MacOS
    * Xcode
    * Clion
    * Qt Creator
    * Eclipse
* Linux



## VS的使用

* 打开VS点击“创建新项目“

    * 筛选C++、windows、控制台

    * 选择空项目

    * 下一步

    * 键入项目名称选择目录

    * 勾选”将解决方案和项目放在同一个目录中“

    * 创建

        * 右键”源文件“--”添加“--”新建项“
        * 【名称】需注意修改后缀名”.c“
        * 添加

    * 可以开始键入代码

        #include<stdio.h>

        int main(void)
        {
        	printf("hello world\n");
        	return 0;

        }

        

    * 注释

        ```#include<stdio.h>```

        #：引入外部文件
        include：指定包含文件包
        <>尖括号：引入的是库文件
        stdio.h：c程序的一个文件，head头，头文件
        std：标准，i：t输入，o：输出，标准输入输出

        整个#include<stdio.h>服务于printf函数

        类似于python的导入模块import

        以下为main的函数体
        ```int main(void)```

        int：表示main函数返回整数值，对应下面的return
        main：代码程序的入口
        （void）：（）表示main的参数，void表示参数为空
        ```{``` 

        main函数起始
        	```printf("hello world\n");```
        	在屏幕上打印“helloworld”
        	```return 0;```
        	retuen：呼应前面的int，0是int的一种
        ```}```

        main函数终止



## 注释

* 注释的定义：我知道

* 注释的方法

    1. 单行注释：//双斜杠

    2. 多行注释：/* 内容*/

    3. 使用“条件编译”进行多行注释

        ```c
        #if 0
        内容
        内容
        内容
        ...
        #endif
        ```



## 解决终端一闪而过的问题

* 通过system（）函数解决，在程序的return 0；之前，添加如下函数
    要插入头部文件

```
#include <stdlib.n>
```

```
system("pause")
```

​		一般出现在非vs2019中







## VS代码运行的4种模式

1. Debug x86：以调试模式运行32位程序，带调试表
2. Debug x64：以调试模式运行64位程序，带调试表
3. Realease  x86：以发布模式运行32位程序，不带调试表
4. Realease  x86：以发布模式运行64位程序，不带调试表



system函数和Sleep函数

## main的两种标准形式

1. 不带参数的

    ```
    int main(void)
    {
    	内容
    	return 0;
    }
    ```

2. 带参数的

    ```
    int main(int argc,char* argv[])
    {
    	内容
    	ruturn 0;
    }
    ```



## gcc编译4步骤

### 预处理器预处理

* 通过-E参数：gcc -E hello.c -o hello.i

* 生成.i预处理文件

* 完成的工做

    1. 展开头文件

        * 头文件展开不检查语法错误，可以展开任意文件

    2. 宏定义替换

        ```
        //宏定义语法：#define 宏名 宏值
        #define PI 3.14
        ```

        * 将宏名赋值宏值

    3. 替换注释

        * 将注释替换为空行或空格

    4. 展开条件编译

        * 根据条件展开函数里的编译的指令

### 编译器编译

* 通过-S参数：gcc -S hello.i -o hello.s
* 生成.s汇编文件
* 完成的工做
    1. 逐行检查语法错误，并给出参考建议(耗时最长)
    2. 将无错误的预处理文件转化为汇编语言写的汇编文件

### 汇编器汇编

* 通过-c参数：gcc -c hello.i -s hello.o
* 生成.o目标文件
* 完成的工做
    1. 将汇编指令的.s文件翻译成二进制文件

### 链接器链接

* 无参数：gcc hello.o -o hello.exe
* 生成.exe执行文件
* 完成的工做
    1. 库引入
    2. 合并多目标文件（多个.c合并成所需的.exe）
    3. 合并启动例程--启动例程：负责调用main函数

另：

* -o是重命名的意思

* 可以跳过步骤，比如不-E、-S直接-c；比如直跳四步gcc hello.c -o hello.exe



## printf格式化输出int

* 代码如下

    ```c
    #include<stdio.h>
    #include<stdlib.h>
    
    int main(void)
    {
    	int a = 10;//赋值
    	printf("%d\n",a);//%d是占位符，表示那个位置输出的是整数
    	printf("%d - %d = %d\n", 2, 1, 2 + 1);
        //占位符对应位置，算数逻辑会运算
        system("pause");
    	return 0;
    
    }
    ```

* 注，int整型若浮点数赋值，则只取整数部分

    ​    

## 程序调试

* 代码如下

    ```c
    #include<stdio.h>
    
    //自定义一个普通函数
    void testFun(void)
    {
    	printf("hello 1\n");
    	printf("hello 2\n");
    	printf("hello 3\n");
    
    }
    
    int main(void)
    {
    	printf("牛逼兄弟\n");
    	testFun();
    	return 0;
    }
    ```

* 调试的前提：程序没有语法错误

* 调试的核心：让程序一行一行地执行

* 调试的一般步骤：

    1. 添加、取消断点（f9），可添加多个
    2. 再Debug模式下，F5启动调试

* 调试的按键：

    1. 逐语句（f11），遇见自定义函数，进入函数内，逐条跟踪执行
    2. 逐过程（f10），遇见自定义函数，不进入函数
    3. 逐断点（shift+f11），直接跳转至下一个断点，也可以跳出函数

* 额外内容

    1. ctrl+f7：编译但不运行，没有语法错误就能生成一个.exe



## 变量

- 变量三要素：
    - 变量类型：决定内存空间大小
    - 变量名：对应内存空间的位置
    - 变量值：表示内存空间内存储的数据

- 变量定义语法：

    - 类型名  变量名 = 变量值;  int  a = 10

- 变量的声明：

    - 作用：让编译器知道，将来会有这样一块内存需要开辟
    - 语法1： 类型名 变量名 ;   int a
    - 语法2： extern 类型名 变量名 ;    extern int a

- 定义和声明的区别：

    - 变量定义会开辟内存空间

    - 变量声明不开辟内存空间



## 常量

- 不会变化的数据 ，不能修改
- 示例：
    1. #define  PI  3.1415    
        - 没有分号结束标记
        - 没有类型描述符
    2. “hello” 字符串常量、‘A’ 字符常量、-10整型常量、3.141浮点型常量
    3. const int a = 10
        - const关键字，限制 a 变量为只读
        - 可以用指针修改a的值



## 标识符

- 标识符：变量和常量的统称

- 要求：

    1. 不能是关键字、库函数名：return、void、extern、system、int等

    2. 只能有 数字、字母、下划线“_”组成

    3. 不能以数字字符开头

    4. 区分大小写

- 建议：

    - 建议使用大写字符命名 “常量”，小写和“_” 命名 “变量”

    - 遵循规范命名法

        1. 大驼峰法：首字母大写，后每个单词首字母大写

        2. 小驼峰法：首字母小写，后每个单词首字母大写