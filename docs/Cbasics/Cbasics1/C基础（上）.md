# c基础（上）

## 1. C语言概述

### 1.1 C语言关键字语句运算符

* 关键字
    * 存储类关键字：auto、const、extern、register、static
    * 控制语句：break、case、continue、default、for、else、goto、if、return、switch、do、while
    * 数据类型：char、double、float、int、log、short、signed、struct、unsigned、union、enum、void
    * 其他：sizeof、typedef、volatile

* 控制语句
    * if()...else...、for()...、while()...、do...while()、continue、break、swtich、goto、ruturn

* 语言运算符

| 优先级 |                                                              |
| ------ | ------------------------------------------------------------ |
| 1      | []   () . ->                                                 |
|        | 数组下标、括号、对象成员选择、指针成员选择                   |
| 2      | -   ++   --（类型） &   ！   zizeof（）                      |
|        | 符号、自增减（后缀>前缀）、强转符、取地址符、逻辑非、长度运算符 |
| 3      | 【算数运算】/   *   % + -                                    |
|        | 除、乘、取余数、加减                                         |
| 4      | 【比较运算】>   <   <=   >=   ==   !=                        |
|        | 大于、小于、小于等于、大于等于、等于、不等于                 |
| 5      | 【逻辑运算】&   ^    \|   &&   \|\|                          |
|        | 按位与、按位异或、按位或、逻辑与、逻辑或                     |
| 6      | 【三目运算】？：                                             |
| 7      | 【赋值运算】= /= *= %= += -= <<= >>= &= ^= \|=               |
| 8      | 【逗号运算】,                                                |

### 1.2 Hello World

```c
#include<stdio.h> //<>引入的是标准库文件，""引入的是非标准文件
int main() 
{ 
    printf("hello world\n"); 
    return 0; 
}
```

### 1.3 gcc编译四步骤

* 预处理器预处理
    * 通过-E参数：gcc -E hello.c -o hello.i，生成.i预处理文件
    * 完成的工做

        1. 展开头文件

        2. 宏定义替换

        3. 替换注释

        4. 展开条件编译指令

* 编译器编译
    * 通过-S参数：gcc -S hello.i -o hello.s，生成.s汇编文件
    * 完成的工做
        1. 逐行检查语法错误，并给出参考建议(耗时最长)
        2. 将无错误的预处理文件转化为汇编语言写的汇编文件

* 汇编器汇编
    * 通过-c参数：gcc -c hello.i -s hello.o，生成.o目标文件
    * 完成的工做
        1. 将汇编指令的.s文件翻译成二进制文件

* 链接器链接
    * 无参数：gcc hello.o -o hello.exe，生成.exe执行文件
    * 完成的工做
        1. 库引入
        2. 合并多目标文件（多个.c合并成所需的.exe）
        3. 合并启动例程--启动例程：负责调用main函数

* 另：
    * -o是重命名的意思
    * 可以跳过步骤，比如不-E、-S直接-c；比如直跳四步gcc hello.c -o hello.exe

### 1.4 程序调试

* 调试的一般步骤：

    1. 添加、取消断点（f9），可添加多个
    2. 再Debug模式下，F5启动调试

* 调试的按键：

    1. 逐语句（f11），遇见自定义函数，进入函数内，逐条跟踪执行
    2. 逐过程（f10），遇见自定义函数，不进入函数
    3. 逐断点（shift+f11），直接跳转至下一个断点，也可以跳出函数

* 额外内容

    1. ctrl+f7：编译但不运行，没有语法错误就能生成一个.exe



## 2. 数据类型

### 2.1 数据类型概述

* 基本类型
    * 整型：int、short、long
    * 字符型：char
    * 实型：float、double
* 构造类型
    * 数组类型
    * 结构类型：struct
    * 联合类型：union
    * 枚举类型：enum

* 指针类型
    * char*、int\*、int**等

### 2.2 标识符

* 标识符：变量和常量的统称
* 要求：

    1. 不能是关键字、库函数名：return、void、extern、system、int等

    2. 只能有 数字、字母、下划线“_”组成

    3. 不能以数字字符开头

    4. 区分大小写

* 建议：

    - 建议使用大写字符命名 “常量”，小写和“_” 命名 “变量”

    - 遵循规范命名法

        1. 大驼峰法：首字母大写，后每个单词首字母大写

        2. 小驼峰法：首字母小写，后每个单词首字母大写

* 常量
    * 不会变化的数据 ，不能修改
    * 示例：#define  PI  3.1415    
        * 没有分号结束标记
        * 没有类型描述符
    * “hello” 字符串常量、‘A’ 字符常量、-10整型常量、3.141实型常量
    * const int a = 10
        * const关键字，限制 a 变量为只读
        * 可以用指针修改a的值

* 变量
    * 变量三要素
        - 变量类型：决定内存空间大小
        - 变量名：对应内存空间的位置
        - 变量值：表示内存空间内存储的数据
    * 变量定义语法

        - 类型名  变量名 = 变量值;  int  a = 10

    * 变量的声明

        - 作用：让编译器知道，将来会有这样一块内存需要开辟
        - 语法1： 类型名 变量名 ;   int a；使用时会自动提升为定义
        - 语法2： extern 类型名 变量名 ;   extern int a；无法提升为定义

    * 定义和声明的区别

        - 变量定义会开辟内存空间，而变量声明不开辟内存空间

### 2.3 整型

* 整型变量的定义和输出

    ```c
    #include <stdio.h>
    
    int main()
    {
    	int a = 123;	//定义变量a，以10进制方式赋值为123
    	int b = 0567;	//定义变量b，以8进制方式赋值为0567
    	int c = 0xabc;	//定义变量c，以16进制方式赋值为0xabc
    
    	printf("a = %d\n", a);
    	printf("8进制：b = %o\n", b);  //8进制占位符为%o
    	printf("10进制：b = %d\n", b); //10进制占位符为%d
    	printf("16进制：c = %x\n", c); //16进制占位符为%x
    	printf("10进制：c = %d\n", c); //10进制占位符为%d
        
        //定义无符号int变量d，以16进制方式赋值
    	unsigned int d = 0xffffffff; 
       
    	printf("有符号方式打印：d = %d\n", d);
    	printf("无符号方式打印：d = %u\n", d);
    	return 0;
    }
    
    ```

### 2.4 sizeof关键字

* sizeof 不是函数，不需要包含任何头文件，返回值为无符号整数，占位符%u

* 测试8种整型的大小和取值范围

    * 代码入下

    ```c
    #include<stdio.h>
    #include<stdlib.h>
    #include<limits.h>
    
    int main(void)
    {
    	int a;
    	short b;
    	long c;
    	long long d;
    
    	printf("int内存大小:%llu\n", sizeof(a));
    	printf("int min:%d ,int max:%d \n", INT_MIN, INT_MAX);
    	printf("int内存大小:%llu\n", sizeof(b));
    	printf("int min:%hd ,int max:%hd \n", SHRT_MIN, SHRT_MAX);
    	printf("int内存大小:%llu\n", sizeof(c));
    	printf("int min:%ld ,int max:%ld \n", LONG_MIN, LONG_MAX);
    	printf("int内存大小:%llu\n", sizeof(d));
    	printf("int min:%lld ,int max:%lld \n", LLONG_MIN, LLONG_MAX);
    	//以下求无标记整型的大小和范围
    	printf("int内存大小:%llu\n", sizeof(a));
    	printf("int min:%u ,int max:%u \n", 0, UINT_MAX);
    	printf("int内存大小:%llu\n", sizeof(b));
    	printf("int min:%hu ,int max:%hu \n", 0, USHRT_MAX);
    	printf("int内存大小:%llu\n", sizeof(c));
    	printf("int min:%lu ,int max:%lu \n",0, ULONG_MAX);
    	printf("int内存大小:%llu\n", sizeof(d));
    	printf("int min:%llu ,int max:%llu \n", 0, ULLONG_MAX);
    
    	return 0;
    
    }
    ```

    * 结果如下

    |                    | 格式匹配符 | 大小                                             | 最小值      | 最大值      |
    | ------------------ | ---------- | ------------------------------------------------ | ----------- | ----------- |
    | int                | %d         | 4字节                                            | -2147483648 | 2147483647  |
    | short              | %hd        | 2字节                                            | -32768      | 32767       |
    | long               | %ld        | Windows32/64为4字节；Linux32位为4字节64位为8字节 | -2147483648 | 2147483647  |
    | long long          | %lld       | 8字节                                            | ≈-9.2*10^18 | ≈9.2*10^18  |
    | unsigned int       | %u         | 4字节                                            | 0           | 4294967295  |
    | unsigned  short    | %hu        | 2字节                                            | 0           | 65535       |
    | unsigned long      | %lu        | Windows32/64为4字节；Linux32位为4字节64位为8字节 | 0           | 4294967295  |
    | unsigned long long | %llu       | 8字节。                                          | 0           | ≈1.84*10^19 |

### 2.5 字符型和ACSII码

* 字符型变量用于存储一个单一字符，本质是一个 1 字节大小的整型

    ```c
    #include<stdio.h>
    
    int main(void)
    {
        char ch = 'a';  
        
        printf("ch[%d]=%d\n", ch);    //占位符%d打印ASCII码值
        printf("ch[%c]=%c\n", ch);    //占位符%c打印字符
        
        //字符+数字
        char A = 'A';
    
    	printf("a = %c\n", 'A' + 32); //大写A转小写a
        
        //字符+字符
    	ch = ' ';                     //空格字符ASCII的值为32
        
    	printf("A = %c\n", 'a' - ' '); //小写a转大写A
        
        return 0;
    }
    ```

### 2.6 scanf()输入函数

* scanf()为函数，需要引入头文件<stdio.h>，需要取地址符==&==取所输入变量的地址

    * 整型输入

    ```c
    #define _CRT_SECURE_NO_WARNINGS
    //写到第一行才有效，防止scanf在VS中报错（解决c4996错误）
    
    #include<stdio.h>
    #include<stdlib.h>
    
    int main (void)
    {
        int a,b,c;
        printf("输入三个数定义(用空格隔开)abc：");
        scanf("%d %d %d",&a，&b,&c);
        //%d间加了一个空格
        printf("从键盘获取的a值为：%d\n"，a);
        printf("从键盘获取的b值为：%d\n"，b);
        printf("从键盘获取的c值为：%d\n"，c);
        
        system("pause");
        return 0;
    }
    ```

    * 字符型输入

    ```c
    #define _CRT_SECURE_NO_WARNINGS
    #include<stdio.h>
    #include<stdlib.h>
    
    int main(void)
    {
        char ch1, ch2, ch3;
        printf("输入三个字母定义(用空格隔开)ch1ch2ch3");
        scanf("%c %c %c", &ch1, &ch2, &ch3);
    	printf("ch1:%c ch2:%c ch3:%c\n", ch1, ch2, ch3);
        printf("ch1:%hhd ch2:%hhd ch3:%hhd\n", ch1, ch2, ch3);
        return 0;
    }
    
    ```

### 2.7 实型（浮点型）

* 单精度浮点型float，占位符为==%f==，默认保留6位小数，4字节
    * 语法：float f1=3.14159f（若不加f则编译器默认为double类型）
    * win系统下精度6或7位
    * 若要打印到小数点后2位，则占位符为==%.2f==
* 双精度浮点型double，占位符为==%lf==，默认保留6位小数，8字节

    * 语法：double d1=3.14159
    * win系统下精度15或16位
    * 若要打印到小数点后2位，则占位符为==%.2lf==

* 注意：

    1. float和double都不存在unsigned类型
    2. 不同平台上的精确的也可能存在差异

### 2.8 格式化输入与输出

* 字符与字符串

    * 字符’a‘为‘a’，字符串”a“为”‘a’,‘\0’“

    * 每个字符串的结尾编译器会自动的添加一个结束标志位'\0'，即 "a" 包含 

        两个字符'a'和’\0’。

* printf函数与putchar函数

    * printf 是输出一个字符串，putchar 输出一个 char
    * ==常用的格式匹配符==

    | 格式匹配符 | 型               | 格式匹配符 | 型                   |
    | :--------- | ---------------- | ---------- | -------------------- |
    | %d         | int              | %lu        | unsigned long        |
    | %c         | char字符         | %llu       | unsigned long long   |
    | %u         | unsigned int     | %lf        | double               |
    | %x         | 整型16进制       | %o         | 整型8进制            |
    | %#x        | 整型16进制带标记 | %#o        | 整型8进制带标记      |
    | %f         | float            | %hhd       | 有符号char数值       |
    | %ld        | long             | %hhu       | 无符号char数值       |
    | %lld       | long long        | %hd        | short                |
    | %hu        | unsigned short   | %e         | double（科学计数法） |
    | %p         | void *（指针）   | %s         | char *字符串（至\0） |

* scanf 函数与 getchar 函数

    * getchar 是从标准输入设备读取一个 char，并以实型返回输入的第一个字符的ASCII码
    * scanf 通过%转义的方式可以得到用户通过标准输入设备输入的数据

    ```c
    #include <stdio.h>
    
    int main()
    {
    	char ch1;
    	char ch3;
    
    	printf("请输入ch1的字符：");
    	ch1 = getchar();
    	printf("ch1 = %c\n", ch1);
    
    	getchar(); //测试此处getchar()的返回值
    
    	printf("请输入ch3的字符：");
    	scanf("%c", &ch3);
    	printf("ch3 = %c\n", ch3);
    
    	return 0;
    ```

    

## 3. 运算符与表达式

### 3.1 常用的运算符

* 算数运算符

    * 先*/%(取余)，后+-
        * 除法运算若结果为浮点数却赋值给整型变量，则只取整数部分
        * 不能对实型取余，因为余数不能是实型
        * 对负数取余，结果为余数的绝对值（编程中对负数取余是有争议的）

* 自增自减运算符

    * 前缀自增/自减

        * 特性：先自增/自减，再取值
    * 后缀自增/自减

        * 特性：先取值，再自增/自减
    * 代码测试

    ```c
    #include<stdio.h>
    
    int main(void)
    {
        int a =10;
        printf("a++ = %d\n",a++);
        printf("++a = %d\n",++a);
        printf("++a后的a = %d\n",++a);
        return 0;
               
    }
    ```

* 赋值运算符

    * 普通赋值a=1

    * 加法连续赋值a+=1、a+=a
    * 其它连续赋值= 、/= 、*=、 %= 、+= 、-=、<<=、 >>= 、&= 、^=、 \|=

* 比较运算符，==输出结果为真、假（1、0）==，连续比较要用&&连接

    * ==判等
    * ！=不等于
    * <、>小于、大于
    * =<、>=小于等于、大于等于

* 逻辑运算符，0为假，非0为真

    * 逻辑非：！

        * 非真为假，非假为真
    * 逻辑与：&&

        * 同真为真，其余为假
    * 逻辑或：||

        * 有真为真，同假为假
    * 代码测试

    ```c
    #include<stdio.h>
    
    int main(void)
    {
        int a = 2;//非0为true
        int b = 0;//0为false
        int c = 3;
        printf("a=2\nb=0\nc=3\n");
    
        //非假为真,非真为假
        printf("!b:%d\n", !b);
        //同真为真，其余为假
        printf("a&&c:%d a&&b:%d\n",a&&c,a&&b );
        //有真为真，同假为假
        printf("a||b:%d\n", a||b);
        return 0;
    }
    
    ```

### 3.2 逗号、三目运算符

* 含有“，”运算符的表达式，称之为逗号表达式，整个表达式的值为最后一个子表达式的值

    * 代码测试

    ```c
    #include<stdio.h>
    
    int main(void)
    {
        int x, y, z;//声明
        int a = (x =1, z =3, y =8);//赋值xyz，a值为最后一个子表达式结果
        printf("a:%d x:%d y:%d z:%d\n", a, x, y, z);
        return 0;
    }
    ```

* 语法：表达式1？表达式2：表达式3

    * 表达式1通常为”判别表达式“
    * 真：三目运算式的值为表达式2的值
    * 假：三目运算式的值为表达式3的值

    ```c
    #include<stdio.h>
    
    int main(void)
    {
        int a=1;
        int b=2;
        int c=a>b?3:a>b:4:5;
        return 0;
    }
    ```


### 3.3 运算符优先级

* 见1.1

### 3.4 类型转换

* ==强制类型转换==，需要编码实现

    * 语法：（类型）（表达式）

    ```c
    #include<stdio.h>
    
    int main(void)
    {
    	float price = 3.6;
    	int weight = 4;
    	
    	int sum1 = weight * (int)price;//强转变量
    	printf("sum1=%d\n", sum1);
    
    	int sum2 = (int)(weight * price);//强转表达式
    	printf("sum2=%d\n",sum2);
    
    	return 0;
    
    }
    ```

* 隐式类型转换，不需要编码实现，编译器自动完成

    * 分类

        1. 编译器按默认的转换准则，自动转换不同的数据类型
            * 低转高，char、short 向 int 向 unsigned int 向 long 向 double 转换

        2. 由赋值运算符产生的转换，低转高，没问题；高转低，可能会数据丢失

        ```c
        float r=1.23456789;
        float s=3.14*r*r;
        //运算表达式为double类型，赋值将double转为float，此处会数据丢失
        ```




## 4. 程序流程结构

### 4.1 流程结构概述

* 顺序结构：程序按顺序执行，不发生跳转
* 选择结构：依据是否满足条件，有选择的执行相应功能
* 循环结构：依据条件是否满足，循环多次执行某段代码

### 4.2 if分支语句

* if分支结构语法：

    ```c
    if(判别表达式1)
    {
        表达式1//判别式1为真，输出表达式1
    }
    else if(判别表达式2)
    {
        表达式2//判别式2为真，输出表达式2
    }
    else if(判别表达式3)
    {
        表达式3//判别式3为真，输出表达式3
    }
    ...
    else  //else其实隐含着非if的意思
    {
        表达式n//以上判别式都为假，输出表达式n
    }
    ```

    * 代码练习：判断学生成绩阶段

    ```c
    #define _CRT_SECURE_NO_WARNINGS
    #include<stdio.h>
    
    int main(void)
    {
        int a;
        printf("请输入学生分数(0-100)：");
        (void)scanf("%d", &a);//将scanf函数的返回值数据类型强转为空
        if (a >= 90&&a<=100)
        {
            printf("优秀，兄弟牛逼!\n");
        }
        else if(a>=80&&a<90)
        {
            printf("良好，兄弟可以!\n");
        }
        else if (a >= 70 && a < 80)
        {
            printf("还行，兄弟加油!\n");
        }
        else if (a >= 60 && a < 70)
        {
            printf("及格，兄弟不行啊!\n");
        }
        else
        {
            printf("不及格，傻逼!废物!弱智!\n");
        }
        return 0;
    }
    ```

### 4.3 switch分支语句

* 精准匹配，结构较清晰，但不能判断区间

    * 语法:

        ```c
        switch(匹配表达式)
        {
        case 常量1：
                    表达式1
        break;//跳出当前switch分支语句，结束switch
        case 常量2：
                    表达式2
        	break;
        ...
        case 常量3：
                表达式3
        	break;
        default:
                表达式n//都不满足上述常量，执行表达式n
        break;
        }
                 
        ```

    * 代码练习：判断学生成绩阶段

        ```c
        #define _CRT_SECURE_NO_WARNINGS
        #include<stdio.h>
        
        int main(void)
        {
        	int score;
        	printf("输入学生成绩（0-100）:");
        	int ret = scanf("%d", &score);
        	switch (score / 10)
        	{
        	case 10:
        		printf("牛逼!");
        		break;
        	case 9:
        		printf("厉害!");
        		break;
        	case 8:
        		printf("可以!");
        		break;
        	case 7:
        		printf("还行!");
        		break;
        	case 6:
        		printf("不行啊!");
        		break;
        	default:
        		printf("废物!");
        		break;
        	}
        return 0;
        }
        ```

### 4.4 while循环语句

* 语法：循环体若没有让判别表达式趋于结束的条件则会一直循环

    ```c
    int main(void)
    {
        int a = 20;
        while (a < 30)
        {
            printf("你好帅哥!\n");
            a=a++;
        }
        return 0;
           
    }
    ```

    * 练习：从1-100数数，逢7和7的倍数不数，打印“你好帅哥!”

    ```c
    #define _CRT_SECURE_NO_WARNINGS
    #include<stdio.h>
    
    int main(void)
    {
        int a = 1;
        while (a < 100)
        {
            if (a % 10 == 7)
            {
                printf("你好帅哥!\n");
            }
            else if (a % 7 == 0)
            {
                printf("你好帅哥!\n");
            }
            else if (a / 7 == 0)
            {
                printf("你好帅哥!\n");
            }
            else
                printf("%d\n", a);
            a = a++;
        }
        return 0;
    
    }
    ```


### 4.5 do...while循环  

* 无论如何都会执行一次循环体

* 语法

    ```c
    #include <stdio.h>
    
    int main(void)
    {
    	int a = 1;
    	do
    	{
    		a++;
    		printf("a = %d\n", a);
    	} while (a < 10);
    
    	return 0;
    }
    ```


### 4.6 for循环

* 语法：

    ```c
    for (表达式1;表达式2;表达式3)
    {
        循环体
    }
    //表达式1通常为赋值表达式，给循环因子赋值，只在for循环开始时执行一次
    //表达式2通常为判别表达式，真：执行循环体，假：for循环结束
    //表达式3通常为赋值表达式。一般是修改循环因子
     
    ```

* for循环运行逻辑：

    1. ==运行顺序为，表达式1>表达式2>循环体>表达式3==
    2. 表达式2内不写、非0、赋值非0，都为1（真）

* 求1~100的和的练习：

    ```c
    #include<stdio.h>
    int i = 0;
    int sum = 0;
    int main(void)
    {
    	for (i = 1; i <= 100; i++)
    		{
    			sum = sum + i;
    		}
    		printf("总和为：%d\n", sum);
    	return 0;
    }
    ```


### 4.7 嵌套for循环

* 语法

    ```c
    for (i = 0; i < 10; i++)
    {
        for (j = 0; j < 10; j++)
        {
            循环体
        }
    }
    ```

    * 练习，打印99乘法表

    ```c
    #include<stdio.h>
    #include<time.h>
        
    int main(void)
    {
        int i,j;
        for (i=1; i < 10 ;i++)
        {
    		for (j = 1; j < 10&&i>=j; j++)
            {
            	printf("%d*%d=%d\t", j, i, i * j);
                    
            }
                printf("\n");
    	}
                   
    	return 0;
    }
    ```

### 4.8 跳转语句

* break语句
    * 打断并跳出当前循环，执行后面的代码
* continue
    * 终止本次循环，执行下一次循环
* goto（尽量不使用）
    * 在需要跳转的地方设置标签名如“A1:”，得带冒号
    * 使用goto“标签名”的语法，跳转到标签的位置（只在函数内生效)

## 5. 数组和字符串

### 5.1 数组

* 相同数据的有序、连续存储

* 按数组元素类型的不同，可分为数值数组、字符数组、指针数组、结构数组等类别

* 基本特性

    1. 数组名是一个地址，为数组首个元素的地址

    ```c
    #include<stdio.h>
    
    int main(void)
    {
        int a[5]={1,2,3,4,5};
        printf("a=%p\n",a);//数组a的地址值
        printf("&a=%p\n",&a[0]);//打印第一个元素的地址
        return 0; 
    }
    ```

    2. 获取数组的大小、获取数组元素的大小、求数组元素的个数

    ```c
    printf("a数组的大小为：%u\n",sizeof(a));
    printf("a数组每个元素的大小为：%u\n",sizeof(a[0]));
    printf("a数组元素个数为：%u\n",sizeof(a)/sizeof(a[0]));
    ```

    3. 数组第一个元素的下标为0，最后一个为sizeof(a)/sizeof(a[0])-1

* ==数组的初始化==

    1. 初始化全部元素，int arr[10]={1,2,3,4,5,0,6,7,8,9};
    2. 初始化部分元素其余用0填充，int arr[5]={1,2,3}={1,2,3,0,0};
    3. 初始化定义一个有5个元素值全为0的数组，int arr[5]={0};
    4. 编译器自动求取元素个数，int arr[]={1,2,3,4,5,6};

* 打印数组元素

    ```c
    #include<stdio.h>
    
    int main(void)
    {
    	int arr[5] = { 0,1,2,3,4};
    	int n = sizeof(arr) / sizeof(arr[0]);
    	for (size_t i = 0; i < n; i++)
    	{
    		printf("%d\n", arr[i]);
    	}
    
    	return 0;
    }
    ```


### 5.2 数组操作练习

* 操作练习，获取数组的最大值

    ```c
    #include<stdio.h>
    
    int main(void)
    {
    	int arr[] = { 31, 99, 4, 2, 1, 49, 113, 24, 6 };
    
    	int max = arr[0]; 
    	int max_idx = 0;  
    
    	int n = sizeof(arr) / sizeof(arr[0]);  
    	for (size_t i = 1; i < n; i++)
    	{
    		if (arr[i] > max)
    		{
    			max = arr[i];  
    			max_idx = i;
    		}
    	}
    	printf("数组arr，最大值为：%d, 其下标为：%d\n", max, max_idx);
    
    	return 0;
    }
    ```

* 代码练习，数组元素逆序

    ```c
    #include<stdio.h>
    
    int main(void)
    {
    	int arr[] = { 31, 99, 4, 2, 13, 49, 113, 24, 6 };
    	int n = sizeof(arr) / sizeof(arr[0]);
    	int cha=0;
    	int i;
    	int j = n - 1;
    
    	for (size_t i = 0; i < n; i++)
    	{
    		if (i <j)
    		{
    			cha = arr[i];
    			arr[i] = arr[j];
    			arr[j] = cha;
    			j--;
    		}
    		
    	}
    	for (size_t k = 0; k < n; k++)
    	{
    		printf("%d ", arr[k]);
    	}
    	return 0;
    }
    ```


### 5.3 冒泡排序

* 让数组内元素从小到大排序

    ```c
    #include<stdio.h>
    
    int main(void)
    {
    	int arr[] = { 31, 99, 4, 2, 13, 49, 113, 24, 6 };
    	int n = sizeof(arr) / sizeof(arr[0]);
    	int i,j,k;
    	int cha;
    
    	for (size_t k = 0; k < n; k++)
    	{
    		printf("%d ", arr[k]);
    	}
    	
    	for (size_t i = 0; i < n; i++)
    	{
    		for (j = 0; j < n - 1 - i; j++)
    		{
    			if (arr[j] >arr[j + 1])
    			{
    				cha = arr[j ];
    				arr[j] = arr[j + 1];
    				arr[j + 1] = cha;
    
    			}
    		}
    	}
    	printf("\n");
    	for (size_t k = 0; k < n;k++)
    	{
    		printf("%d ", arr[k]);
    	}
    	return 0;
    }
    ```

### 5.4 二维数组

* 语法

    * 类型说明符 数组名 [常量表达式1]\[常量表达式2]

    ```c
    //语法1
    int arr[3][5]={{1,2,3,4,5},{1,2,33,4,5},{1,2,5,6,4}};
    //语法2
    int arr2[4][5] =
    {
        {1,2,3,4,5},   
        {1,2,3,4,5},   
        {1,2,3,4,5},   
        {1,2,3,4,5}    
    }
    ```

* 初始化定义

    1. 常规初始化

    ```c
    int arr[3][5]={{1,2,3,4,5},{1,2,33,4,5},{1,2,5,6,4}}
    ```

    2. 不完全初始化

    ```c
    int arr[3][5]={{1,2,3,4,5},{1,2,33,4,5}};//未初始化的数值为0
    int arr[3][5]={0};//初始化一个全为0的二维数组
    int arr[3][5]={1,2,3,4,5,7,6,8};//系统会按照行列值自动分配
    ```

    3. 不完全指定行列的初始化，==不能不指定列值==

    ```c
    int arr[][5]={1,2,3,4,5,7,6,8};
    ```

* 1. 数组大小/一行大小/一个元素大小/行数/列数

      ```c
      sizeof(arr);//数组大小
      sizeof(arr[0]);//一行大小
      sizeof(arr[0][0]));//一个元素大小
      sizeof(arr) / sizeof(arr[0]);//行数
      sizeof(arr[0]) / sizeof(arr[0][0]);//列数
      ```

        1. 地址合一，数组的首地址=数组名=数组首元素的地址=数组首行的地址

      ```c
      printf("%p\n", arr);// 数组的首地址
      printf("%p\n", arr[0]);// 数组首行的地址
      printf("%p\n", &arr[0][0]);// 数组首行首元素的地址
      ```

* 代码练习，获取5名学生3门功课的成绩，求一门功课的总成绩和每个学生的总成绩

    ```c
    #define _CRT_SECURE_NO_WARNINGS
    #include<stdio.h>
    
    int main(void)
    {
    	int scores[5][3] = { 0 };
    	int  j=0;
    
    	for (size_t i = 0; i < 5; i++)
    	{
    		for (j = 0;j < 3; j++)
    		{
    			scanf("%d", &scores[i][j]);
    		}
    	}
    
    	for (size_t i = 0; i < 5; i++)
    	{
    		for (j = 0; j < 3; j++)
    		{
    			printf("%d ", scores[i][j]);
    		}
    		printf("\n");
    
    	}
    	
    	for (size_t i = 0; i < 5; i++)
    	{
    		int sum = 0;
    
    		for (size_t j = 0; j < 3; j++)
    		{
    			
    			sum =sum+ scores[i][j];
    		}
    		printf("学生%d的总成绩为：%d ", i+1, sum);
    	}
    
    	return 0;
    }
    ```

### 5.5 字符串

* 字符数组

    ```c
    char str[5]={'a','c','b','d','e'};
    ```

* 字符串

    * c语言中在双引号内的一串字符，称谓字符串
    * 字符串是一个特殊的字符数组，==必带‘\0’做结束标记==

    ```c
    char str[6]={'a','c','b','d','e','\0'};
    ```

    * 一般书写成

    ```c
    char str[6]="acbde";
    或
    char str[]="acbde";
    ```

* 字符串的输出，使用占位符%s

    * printf(”%s“);从字符数组的第一个字符开始，直到‘\0’，乱码现象就是没有‘\0‘

    ```c
    #include<stdio.h>
    
    int main(void)
    {
    	char str[] = "hello";
    	printf("%9s\n", str);
        //显示9个字符的字符串，不足9位用空格在左边填充
    	printf("%09s\n", str);
        //显示9个字符的字符串，不足9位用0在左边填充
    	printf("%-9s\n", str);
        //显示9个字符的字符串，不足9位用空格在右边填充
    
    	return 0;
    }
    
    ```

* 字符串的输入

    * 获取字符串，scanf(“%s”);

        * 用于存储字符串的空间必须足够大，否则会溢出

    ```c
    char str[5];//最多能存储4个有效字符
    ```

    * 当scanf（）函数结合%s接受字符产时，遇到==空格和\n==会终止接受

    ```c
    #define _CRT_SECURE_NO_WARNINGS
    #include<stdio.h>
    
    int main(void)
    {
    	char str[100] = {0};
    	scanf("%s\n", str);
    	printf("%s\n", str);
    
    	return 0;
    
    }
    ```

    * 扩展：正则表达式

    ```c
    scanf("%[^\n]",strs)//除了"\n"都接收为字符数组元素
    ```

    * 代码练习，键盘输入字符串存至str[]中，统计每个字母出现的次数

    ```c
    #define _CRT_SECURE_NO_WARNINGS
    #include<stdio.h>
    
    int main(void)
    {
    	char str[100] = { 0 };
    	char str1[26] = { 0 };
    
    	printf("请输入一个单词：");
    	scanf("%s", str);
    	int n = sizeof(str) / sizeof(str[0]);
    
    	for (size_t i = 0; i < n; i++)
    	{
    		int a = str[i];
    		if (a < 91)
    			a += 32;
    		int b = a - 97;
    		str1[b]+=1;
    	}
    
    
    	for (size_t j = 0; j < 26; j++)
    	{
    		char z = j+97;
    		printf("字母%c出现了%d次\n", z, str1[j]);
    	}
    
    	return 0;
    }
    ```


### 5.6 字符串基本操作

* gets()

    ```c
    #include <stdio.h>
    char *gets(char *s);
    //成功：返回读入的字符串
    //失败：返回NULL
    ```

    * 从标准输入（键盘）读入字符保存到 s 内，直到出现换行符或读到文件结尾为止
    * gets(str)允许输入的字符串含有空格，scanf(“%s”,str)不允许含有空格
    * 由于scanf()和gets()无法知道字符串s大小，易导致字符数组越界(的情况，一般不使用

* fgets()

    ```c
    #include <stdio.h>
    char *fgets(char *s, int size, FILE *stream);
    
    //s：字符串
    //size：指定最大读取字符串的长度（size - 1）
    //stream：文件指针，如果读键盘输入的字符串，固定写为stdin
    //成功：返回成功读取的字符串
    //读到文件尾或出错： 返回NULL
    ```

    * 从stream指定的文件内读入字符保存到s内，直到出现换行字符、读到文件结尾或是已读了size - 1个字符为止，最后会自动加上字符 '\0' 作为字符串结束
    * fgets()函数结尾多了“\n”，是安全的，不存在缓冲区溢出的问题

    ```c
    #include <stdio.h>
    
    int main(void)
    {
    	char str[100];
    	printf("请输入str: ");
    	fgets(str, sizeof(str), stdin);
    	printf("str = %s\n", str);
    	return 0;
    }
    ```

* puts()

    ```c
    #include <stdio.h>
    int puts(const char *s);
    
    //s：字符串首地址
    //成功：返回非负数 0
    //失败：返回-1
    ```

    * 标准设备（屏幕）输出s字符串，在输出完成后自动输出一个'\n'

* fputs()

    ```c
    #include <stdio.h>
    int fputs(const char * str, FILE * stream);
    
    //str：字符串
    //stream：文件指针，如果把字符串输出到屏幕，固定写为stdout
    //成功：返回0
    //失败：返回-1
    
    ```

    * 将str所指定的字符串写入到stream指定的文件中， 字符串结束符 '\0'  不写入文件
    * fputs()是puts()的文件操作版本，但fputs()不会自动输出一个'\n'

    ```c
    #include <stdio.h>
    
    int main(void)
    {
    	char str[100];
    	printf("请输入str: ");
    	fgets(str, sizeof(str), stdin);
    
    	printf("str = %s\n", str);
    	puts(str);
    	printf("------------\n");
    	fputs(str, stdout);
    	printf("------------\n");
    
    	return 0;
    }
    ```

* strlen()

    ```c
    #include <string.h>
    size_t strlen(const char *s);
    
    //s：字符串首地址
    //返回值：字符串s的长度，size_t为unsigned int类型
    ```

    * 头文件<string.h>
    * 计算指定指定字符串s的长度，到‘\0’结束，且不包含字符串结束符‘\0’

    ```c
    #include <stdio.h>
    
    int main(void)
    {
    	char str[] = "abc\0defg";
    	int n = strlen(str);
    	printf("n = %d\n", n);
    	return 0;
    }
    ```

* 练习，字符串追加

    ```c
    #include <stdio.h>
    
    int main()
    {
    	char str1[] = "abcdef";
    	char str2[] = "123456";
    	char dst[100];
    
    	int i = 0;
    	while (str1[i] != 0)
    	{
    		dst[i] = str1[i];
    		i++;
    	}
    
    	int j = 0;
    	while (str2[j] != 0)
    	{
    		dst[i + j] = str2[j];
    		j++;
    	}
    	dst[i + j] = 0; //字符串结束符
    
    	printf("dst = %s\n", dst);
    
    	return 0;
    }
    ```

### 5.7 字符串的常用处理函数

* 字符串拷贝strcpy()

    ```c
    char *strcpy(char *dest, const char *src);    
    ```

    * 将 src 的内容，拷贝给 dest， 返回 dest，dest空间要足够大，不够大会损失数据
    * 函数调用结束，返回值 和 dest 结果一致

* 字符串拷贝strncpy()

    ```c
    char *strncpy(char *dest, const char *src, size_t n);	  // 安全
    ```

    * 将 src 的内容只拷贝n个字节至dest，dest空间要足够大，通常 n 与 dest 的空间大小一致
    * n > src只拷贝 src 大小，n < src只拷贝 n 个字节，不会自动添加 \0

    ```c
    int main(void)
    {
    	char str[] = "hello world";
    
    	char dst[100] = { 0 };
    
    	char* p = strncpy(dst, str, sizeof(dst));
    
    	//for (size_t i = 0; i < 10; i++)
    	//{
    	//	printf("%c\n", p[i]);
    	//}
    
    	printf("%s\n", p);
    
    	return 0;
    }
    ```
    
* 字符串拼接strcat()

    ```c
    char *strcat(char *dest, const char *src);
    ```

    * 将 src 中内容，拼接到 dest 后，返回拼接成功的字符串，需保证 dest 空间足够
    * 函数调用结束后，dest 和 返回值结果相同

    ```c
    int main(void)
    {
    	char str[] = "hello world";
    
    	char dst[100] = "haha hoho xixi";
    
    	char *p = strcat(dst, str);
    
    	printf("p = %s\n", p);
    	printf("dst = %s\n", dst);
    
    	system("pause");
    	return EXIT_SUCCESS;
    }
    ```

* 字符串拼接strncat()

    ```c
    char *strncat(char *dest, const char *src, size_t n);
    ```

    * 将 src 中前 n个字符拼接到 dest 后，返回拼接成功的字符串，需保证 dest 空间足够
    * 函数调用结束后，dest 和 返回值结果相同

    ```c
    int main(void)
    {
    	char str[] = "hello world";
    
    	char dst[100] = "haha hoho xixi";
    
    	char* p = strncat(dst, str, 7);
    
    	printf("p = %s\n", p);
    	printf("dst = %s\n", dst);
    
    	system("pause");
    	return EXIT_SUCCESS;
    }
    ```

* 字符串比较strcmp()

    ```c
    int strcmp(const char *s1, const char *s2);
    ```

    * 字符比较可以使用  `> < <= >= == !=` ,  字符串比较则不允许
    * 比较 s1 和  s2 两个字符串，如果相等返回0
    * 如果不相等， 进一步比 s1和 s2对应位上的 ASCII码值。
        - s1 > s2 返回 1
        - s1 < s2 返回 -1

    ```c
    int main(void)
    {
    	char s1[] = "helloz";
    
    	char s2[] = "helloaworld";
    
    	printf("ret = %d\n", strcmp(s1, s2));   // 不比较 ASCII 的 和
    
    	system("pause");
    	return EXIT_SUCCESS;
    }
    ```

* 字符串比较strncmp()

    ```c
    int strncmp(const char *s1, const char *s2, size_t n);
    ```

    * 比较 s1 和  s2 两个字符串的前n个字符，如果相等返回0
    * 如果不相等， 进一步比 s1和 s2对应位上的 ASCII码值
        - s1 > s2 返回 1
        - s1 < s2 返回 -1

    ```c
    char s1[] = "helloz";
    char s2[] = "helloaworld";
    printf("ret = %d\n", strncmp(s1, s2, 6)); 
    ```

* 格式化输出sprintf()

    ```c
    int sprintf(char *str, const char *format, ...);  
    ```

    * 将原来输出到屏幕的 “格式化字符串”写到的 str 中

    ```c
    char str[1024] = {0};   // 保证空间足够大
    sprintf(str, "%d + %d = %d\n", 10, 24, 10 + 24);  
    // 写到str中,不打印屏幕
    
    puts(str);
    printf("---%s", str);
    ```

* 格式化输入sscanf()

    ```c
    int sscanf(const char *str, const char *format, ...);
    ```

    * 将原来从键盘获取到的 “格式化字符串”， 从 参1 的 str 中获取

    ```c
    int a, b, c;
    
    // scanf("%d+%d=%d", &a, &b, &c);  // 从键盘 stdin 读取。
    
    char str[] = "10+20=30";  	// 提供给 sscanf 参1 使用。
    
    int ret = sscanf(str, "%d+%d=%d", &a, &b, &c);
    
    printf("a = %d\n", a);
    printf("b = %d\n", b);
    printf("c = %d\n", c);
    ```

* 字符串查找字符strchr()

    ```c
    char *strchr(const char *s, int c);
    ```

    * 在字符串s中，找字符c出现的位置，返回字符在字符串中的地址

    ```c
    int main(void)
    {
    	char* p = strchr("helllloabc", 'a');
    	printf("%s\n", p);
    	return 0;
    }
    ```

    * 从右到左strrchr()

* 字符串中寻找字串strstr()

    ```c
    char *strstr(const char *s, const char *substr);
    ```

    * 在字符串s中，找字符串substr出现的位置，返回substr在字符串s中的地址

* 字符串分割strtok()

    ```c
    char *strtok(char *str, const char *delim);
    ```

    * str为待拆分字符串，delim为分割符组成的字符串，delim内可直接写多个分隔符
    * strtok调用完成，会将分割符用 \0 替换
    * strtok() 函数直接在原串上对字符串分割，不能分割字符串常量char *p = “hello”

    ```c
    int main(void)
    {
    	char str[] = "www.itc ast.cn";  
    	char* p = strtok(str, ". ");   //两个分隔符，'.'与' '（空格）
    
    	printf("p = %s\n", p);
    
    	for (size_t i = 0; i < 13; i++)
    	{
    		//printf("%c\n", str[i]);
    		printf("%d\n", str[i]);   // 打印每个字符的 ASCII码
    	}
    
    	return 0;
    }
    
    ```

    * 第一次用strtok()拆分，参1传待拆分的原串，第2次开始，参1传NULL

    ```c
    int main(void)
    {
    	char str[] = "www.itcast.cn";  
    	char* p = strtok(str, ".");   
    
    	printf("p = %s\n", p);
    	
        while(1)
        {
            p=strtok(NULL,".");
            if(p==NULL)
            {
                break;
            }
            printf("p=%s\n",p);
        }
    	return 0;
    }
    ```

### 5.8 字符串转换

* 语法

    ```c
     #include <stdlib.h>
    
    int atoi(const char *nptr);
    double atof(const char *nptr);
    long atol(const char *nptr);
    long long atoll(const char *nptr);
    ```

    * 作用与使用要求
        * 将字符串转整数、小数、长整数、长长整型
        * 使用这类函数进行转换时， 原串必须是可转换的字符串
        * 若原串必须是“1245dke89” ，只转换12345

    ```c
    	char str1[] = "12abc3456";
    	int num = atoi(str1);
    	printf("num = %d\n", num);
    
    	char str2[] = "3.14";
    	double num2 = atof(str2);
    	printf("num2 = %lf\n", num2);
    
    	char str3[] = "34568490354";
    	long long num3 = atoll(str3);
    	printf("num3 = %lld\n", num3);
    ```

    

