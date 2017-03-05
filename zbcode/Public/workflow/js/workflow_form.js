$(document).ready(function(){
	$(".btn_sub").click(function(){
		// alert($(this).attr("attr"));
		var submitType = $(this).attr("attr");
		var requestmemo = $("#requestmemo").val();
		$.ajax({
			type:'POST',
			url:'/Workflow/Request/formSubmit/type/'+submitType,
			data:$("form").serialize()+"&requestmemo="+requestmemo,
			dataType: "json",
            success: function(data){
                    
					alert(data.msg)
					if(data&&data.status==1){
						window.location.href='/workflow/request/form/requestid/'+data.requestid;
					}
					
            }
		})
		
	})
	$(".btn_add").click(function(){
		var formid = $(this).attr("attr");
		var size = $("#formtable_dt"+formid).find("tr").size();
		if(size>1){
			var tempid = parseInt($("#formtable_dt"+formid).find("tr").last().find("input[name='formtabledt"+formid+"[]']").val())+1;
		}else{
			var tempid = 1;
		}
		
		// alert(tempid)
		
		var formtable_dt_trhtml = eval("formtable_dt"+formid+"_trhtml");
		 
		var regS = new RegExp("{temptrid}","g");
		temp = formtable_dt_trhtml.replace(regS,tempid)
		
		$("#formtable_dt"+formid).append(temp);
		
	})
	$(".btn_del").click(function(){
		var formid = $(this).attr("attr"); 
		$("input[name='formtabledt"+formid+"[]']:checked").each(function(){
			var id =$(this).next().val();
			console.log(id)
			if(id>0){
				var value=$("#form"+formid+"_del").val();
				value=value?(value+","+id):id;
				$("#form"+formid+"_del").val(value)
			}
			$(this).parent().parent("tr").remove()
		})
		
	})
})