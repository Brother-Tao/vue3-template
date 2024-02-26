1.看本地分支

git branch

2. 查看远程分支

git branch -r 3. 查看所有分支

git branch -a 4. 创建本地新分支

git branch [branch name]

5. 切换到新分支

git checkout [branch name]

6. 创建分支同时也切换分支

git checkout -b [branch name]

7. 推送本地新分支到远程仓库

git push origin [branch name]

git上传规范：

feat：新增功能
fix：修复bug
docs：修改文档
style：修改代码风格
refactor：重构代码
test：增加或修改测试代码
chore：修改构建过程或辅助工具

npm 临时换源： npm --registry https://registry.npmmirror.com install <包>

git config user.name "name"
git config user.email "email"
